import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import checkAuth from '../middleware/check-auth';

//import model
import Package from '../models/package';
// import controller
import packageController from '../controllers/package';

const router = express.Router();

router.route('/')
  .post(checkAuth, packageController.addPackage)
  .get(checkAuth, packageController.getAllPackages)

export default router;