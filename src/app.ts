import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const { PORT } = process.env;
const app = express();

app.get('/', (req, res) => {
  res.send('test');
})

app.listen(3000, () => {
  console.log(`Listening on ${PORT}.`);
})
