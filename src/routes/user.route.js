import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import checkAuth from '../middleware/check-auth';


//import model
import User from '../models/user';
// import controller
import userController from '../controllers/user';

const router = express.Router();


//user login
router.post('/login', userController.logIn);

router.route('/')
  .post(userController.createUser)
  .get(checkAuth, userController.allUsers)

  router.route('/:id')
  .delete(userController.removeUser)
  .get(checkAuth, userController.showUserById)

export default router;