import express, { Request, Response } from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { authenticateJWT } from './utils/auth';

//routers
import userRouter from './routes/user';
import offerRouter from './routes/offer';
import {imagesRouter} from './routes/images';

dotenv.config();

const { API_PORT } = process.env;
const app = express();

app.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
)

app.use(cookieParser());
app.use(express.json());

app.use('/user', userRouter);

app.use('/offer', offerRouter);

app.use('/image', imagesRouter);

app.listen(API_PORT, () => {
  console.log(`Listening on ${API_PORT}.`);
})
