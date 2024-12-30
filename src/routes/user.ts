import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import {authenticateJWT, createJWT, hashPassword, verifyPassword} from '../utils/auth';
import { UserStatus } from '../../shared/enums/api';

const userRouter = Router();

const prisma = new PrismaClient();

userRouter.get('/', authenticateJWT, async (req: Request, res: Response) => {

  const data = await prisma.user.findMany();

  res.json(data);
});


userRouter.get('/logout', authenticateJWT, (req: Request, res: Response) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'prod',
    //Ts lmao
    sameSite: 'strict' as 'strict',
    maxAge: 24 * 60 * 60 * 1000
  }
  console.log('loggin gout');
  res.clearCookie('authToken', cookieOptions);
  res.status(200).json(req.session);
})

userRouter.post('/login', async (req: Request, res: Response) => {

  if(!req.body){
    console.log("no body");
    res.sendStatus(400);
    return;
  }
  const {
    email,
    passwordAttempt
  } = req.body;

  //get password
  try{
    var user = await prisma.user.findFirst({ where: { 
      email
    }});

  }catch{
    console.log('error with getting user');
    res.sendStatus(400);
    return;
  }

  if(!user || !user.passwordHash) { 
    console.log('erro wtih getting user');
    res.sendStatus(400);
    return;
  }

  console.log("sending", user.passwordHash, passwordAttempt);
  const loginResult = await verifyPassword(user?.passwordHash, passwordAttempt);

  if(!loginResult){
    res.sendStatus(401);
    return;
  }
  const authToken = createJWT(user.id);

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'prod',
    //Ts lmao
    sameSite: 'strict' as 'strict',
    maxAge: 24 * 60 * 60 * 1000
  }

  console.log('logged in');

  res.clearCookie('authToken', cookieOptions);
  res.status(200).cookie('authToken', authToken, cookieOptions).json(user.email);
})

userRouter.post('/register', async (req: Request, res: Response) => {
  const { 
    email,
    password
  } = req.body;


  if(!email || !password){
    res.sendStatus(400);
    return;
  }

  const passwordHash = await hashPassword(password);

  if(!passwordHash){
   res.status(200).json({ status: UserStatus.PASSWORD_INVALID }); 
   return
  }

  try{
    await prisma.user.create({ 
      data: { email, passwordHash }
    })
  }catch{
    res.status(200).json({ status: UserStatus.EMAIL_TAKEN });
    return;
  }


  res.status(201).json({ status: UserStatus.CREATED });
});

export default userRouter;

