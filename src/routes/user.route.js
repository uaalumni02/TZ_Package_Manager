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
router.post('/login', userController.userLogin);

router.route('/')
  .post(userController.addUser)
  .get(checkAuth, userController.getAllUsers)

  router.route('/:id')
  .delete(userController.deleteUser)
  .get(checkAuth, userController.getUserById)

export default router;