import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {NextFunction, Request, Response} from 'express'
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as jwt.Secret

export function authenticateJWT(
	req  : Request,
	res  : Response,
	next : NextFunction
) : any {
  console.log('request', req.originalUrl);
	const token = req.cookies.authToken;

	if(!token) {
    console.log('err');
		return res.status(401).send('Invalid token');
	}

	jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
		if(err) {
      console.log('err');
		  res.status(401).send("Authentication failed");
      return
		}

    console.log('continue');
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

