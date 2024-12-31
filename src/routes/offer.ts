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
  
  res.sendStatus(200);
})

export default offerRouter;



