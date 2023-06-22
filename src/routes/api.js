import express from 'express';
import userController from '../controllers/user-controller.js';
import contactController from '../controllers/contact-controller.js';
import addressController from '../controllers/address-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';

const userRouter = express.Router();

userRouter.use(authMiddleware);

// User API
userRouter.get('/api/users/current', userController.get);
userRouter.patch('/api/users/current', userController.update);
userRouter.delete('/api/users/logout', userController.logout);

// Contact API
userRouter.post('/api/contacts', contactController.create);
userRouter.get('/api/contacts/:contactId', contactController.get);
userRouter.get('/api/contacts/', contactController.search);
userRouter.put('/api/contacts/:contactId', contactController.update);
userRouter.delete('/api/contacts/:contactId', contactController.remove);

// Address API
userRouter.post('/api/contacts/:contactId/addresses', addressController.create);
userRouter.get(
  '/api/contacts/:contactId/addresses/:addressId',
  addressController.get
);
userRouter.get('/api/contacts/:contactId/addresses', addressController.list);
userRouter.put(
  '/api/contacts/:contactId/addresses/:addressId',
  addressController.update
);

export { userRouter };
