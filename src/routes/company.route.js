import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import checkAuth from '../middleware/check-auth';


//import model
import Company from '../models/company';
// import controller
import companyController from '../controllers/company';

const router = express.Router();

router.route('/')
  .post(checkAuth, companyController.addDeliveryName)
  .get(checkAuth, companyController.allDeliverers)

  router.route('/:id')
  .get(checkAuth, companyController.getDelivererById)

  export default router;