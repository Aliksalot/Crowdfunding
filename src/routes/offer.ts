import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CommentWithRelations, OfferWithRelations } from '../../shared/types/extended-models';
import {authenticateJWT, createJWT, hashPassword, verifyPassword} from '../utils/auth';
import {PaymentStatus} from '../../shared/enums/api';

const offerRouter = Router();

const prisma = new PrismaClient();

offerRouter.get('/', authenticateJWT, async (req, res) => {
  const offers = await prisma.offer.findMany();

  res.json(offers);
});

offerRouter.put('/findOne', async (req, res) => {

  const where_filter = req.body || {};

  try{
    const offer = (await prisma.offer.findUnique({
      where: where_filter,
      include: {
        user: true,
        funds: true,
        comments: {
          include: {
            user: true,
          }
        },
      }
    })) as unknown as OfferWithRelations;

    if(!offer){ 
      res.json({})
      return;
    }

    for(const comment of offer.comments){
      if(comment.replyToId){
        const parentComment = offer.comments.find((_comment) => _comment.id === comment.replyToId ) as CommentWithRelations;
        if(parentComment.replies === undefined){
          parentComment.replies = [];
        }
        parentComment.replies.push(comment);
      }
    }
    
    offer.comments = offer.comments.filter((_comment) => !_comment.replyToId );
    
    res.json(offer);
    return;
  }catch(err){
    console.log(err);
    res.json({});
  }

  res.status(201);
});

offerRouter.post('/findMany', async (req, res) => {
  const where_filter = req.body || {};

  try{
    const offers = await prisma.offer.findMany({ where: where_filter });
    res.json(offers);
  }catch(err){
    console.log('err');
    console.log(err);

  }

  res.status(201);
});

offerRouter.post('/delete', authenticateJWT, async(req, res) => {
  
  const offerId = req.body.id;
  const userId = (req.session as any).userId.userId;

  console.log('request to delete');
  const user = await prisma.user.findFirst({ where: { id: userId } });

  const hasRightToDelete = user?.isAdmin || user?.id === userId;

  if(hasRightToDelete){
    console.log("passed has right to delete");
    try{
      await prisma.fund.deleteMany({ where: { offerId }});
      await prisma.comment.deleteMany({ where: { offerId }});
      const result = await prisma.offer.delete({ where: { id: offerId } });
      console.log(result);
    }catch(e){
      console.log("error with deletion");
      console.log(e);
    }
    res.status(200);
  }else{
    res.status(401);
  }
  res.send();
})
offerRouter.post('/new', authenticateJWT, async (req, res) => {

  const userId = (req.session as any).userId.userId;
  console.log(userId, req.body);


  try{
    const create_result = await prisma.offer.create({
      data: {
        title: req.body.title,
        cover: req.body.cover,
        text: req.body.text,
        goal: req.body.money,
        location: req.body.location,
        category: req.body.category,
        creator: userId,
        raised: 0
      }
    })
  }catch(err){
    console.log('couldn\'t create');
    console.log(err);
  }
  
  res.status(200).json({});
})

offerRouter.post('/:id', authenticateJWT, async(req: Request, res: Response) => {

  const id = req.params.id;

  const newOffer = req.body;

  if(!id){ res.sendStatus(400); return; }

  try{
    const result = await prisma.offer.update({ where: { id: parseInt(id) }, data: newOffer });

    console.log(result);
    res.json({});
  }catch{
    res.json({});
  }
})

offerRouter.put('/comment', authenticateJWT, async(req: Request, res: Response) => {
  //text, replyto
  
  try{
    const { text, replyTo, offerId } = req.body;
    const userId = (req.session as any ).userId.userId;

    await prisma.comment.create({ data: {
      text, offerId, userId,
      replyToId: replyTo || null,
    }})
  }catch (err){
    console.log(err);
  }
  res.json({});
});

offerRouter.put('/fund', authenticateJWT, async(req: Request, res: Response) => {
  try{
    const { offerId, value } = req.body;

    const userId = (req.session as any ).userId.userId;

    await prisma.fund.create({ data: {
      offerId, amount: value, userId
    }});
    await prisma.offer.update({
      where: {
        id: offerId
      },
      data: {
        raised: {
          increment: value
        }
      }
    });

    res.json({ status: PaymentStatus.SUCCESS });
  }catch{
    res.json({ status: PaymentStatus.FAIL });
  }
});

offerRouter.put('/approve', authenticateJWT, async(req: Request, res: Response) => {

  console.log("request to approve");
  try{
    const { id } = req.body;
    const userId = (req.session as any).userId.userId;
    console.log('userid: ', userId);

    const user = await prisma.user.findFirst({ where: { id: userId }})

    if(!user?.isAdmin){
      console.log("401 only admin can approve");
      res.status(401).json();
      return;
    }

    const result = await prisma.offer.update({ 
      where: { id },
      data: {
        approved: true
      },
    });

    console.log(result);

    res.status(200).json();
  }catch(err){
    console.log(err);
    res.status(400).json(err);
  }
});

export default offerRouter;



