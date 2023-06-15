import express from 'express';
import userController from '../controllers/user-controller.js';

const publicRouter = express.Router();

publicRouter.post('/api/users/register', userController.register);

export default publicRouter;