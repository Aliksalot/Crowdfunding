import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {NextFunction, Request, Response} from 'express'
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET as jwt.Secret

export function noteAdminAuth(
	req  : Request,
	res  : Response,
	next : NextFunction
): void {

  try{
    if(!((req.session as any).userId && (req.session as any).userId.userId)){
      next();
      return;
    }
    const userId = (req.session as any).userId.userId;

    prisma.user
    .findFirst({where:{id:userId}})
    .then( async(user) => {
      if(user && user.isAdmin){
        await prisma.adminAction.create({
          data: { adminId: userId }
        });
        console.log("[INFO] Added admin action");
      }
    })
    .catch((error) => {
      console.log(`[ERROR] Couldn't add admin action: ${error}`);
    })
    .finally(() => {
      next();
    })
  }catch(error){
    console.log(`[ERROR] Unexpected error on add admin action: ${error}`);
  }
}

export function authenticateJWT(
	req  : Request,
	res  : Response,
	next : NextFunction
) : any {
	const token = req.cookies.authToken;

	if(!token) {
    console.log('err');
		return res.status(401).send(`Invalid token ${req.originalUrl}`);
	}

	jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
		if(err) {
      console.log('err');
		  res.status(401).send("Authentication failed");
      return
		}

		(req.session as any).userId = decoded;
		next();
	});
}

export function createJWT(userId: number) : any {
	return jwt.sign({ userId }, JWT_SECRET);
}

export async function verifyPassword(passwordHash: string, passwordChallenge: string) : Promise<boolean | undefined> {
	try {
		return await bcrypt.compare(passwordChallenge, passwordHash);
	} catch(e) {
		console.error(e);
	}
}

export async function hashPassword(password: string) : Promise<string | undefined> {
	try {
		const salt = await bcrypt.genSalt(10);
		return await bcrypt.hash(password, salt);
	} catch(e) {
		console.log(e);
	}
}

export function generateOTP(): string {
	const length = 32;
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		result += characters.charAt(randomIndex);
	}

	return result;
}

