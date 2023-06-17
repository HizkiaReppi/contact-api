import express from 'express';
import cors from 'cors';
import publicRouter from '../routes/public-api.js';
import errorMiddleware from '../middleware/error-middleware.js';

export const server = express();
server.use(express.json());

server.use(publicRouter);

server.use(cors());
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Content-Type', 'application/json');
  next();
});

server.use(errorMiddleware);
