import 'dotenv/config';
import 'express-async-errors';
import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import '../../container';
import { AppError } from '../../errors/AppError';
import { routes } from './routes';

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL || 'mongodb://192.168.3.30:27017/bluebank');

app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    console.log(err);
    return response
      .status(err.statusCode)
      .json({ message: err.message });
  }

  console.log(err);
  return response.status(500).json({ message: `Erro interno do servidor` });
});

app.listen(3333, () => console.log('Server started in port 3333 🔥🚀'));