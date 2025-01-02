import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import {authenticateJWT, createJWT, hashPassword, verifyPassword} from '../utils/auth';
import { UserStatus } from '../../shared/enums/api';

const offerRouter = Router();

const prisma = new PrismaClient();

offerRouter.get('/', authenticateJWT, async (req, res) => {
  const offers = await prisma.offer.findMany();

  res.json(offers);
});

offerRouter.put('/findOne', authenticateJWT, async (req, res) => {

  const where_filter = req.body || {};

  console.log(typeof where_filter.id);

  try{
    const offer = await prisma.offer.findFirst({ where: where_filter });
    res.json(offer);
    return;
  }catch{
    console.log('err');
    res.json({});
  }

  res.status(201);
});

offerRouter.post('/findMany', authenticateJWT, async (req, res) => {
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

  console.log(offerId, userId);
  const user = await prisma.user.findFirst({ where: { id: userId } });

  const hasRightToDelete = user?.isAdmin || user?.id === userId;

  if(hasRightToDelete){
    try{
      await prisma.offer.delete({ where: { id: offerId } });
    }catch{
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

export default offerRouter;



