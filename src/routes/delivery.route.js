import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import checkAuth from '../middleware/check-auth';


//import model
import Delivery from '../models/delivery';
// import controller
import deliveryController from '../controllers/delivery';

const router = express.Router();

router.route('/')
  .post(checkAuth, deliveryController.addDeliveryName)
  .get(checkAuth, deliveryController.allDeliverers)

  router.route('/:id')
  .get(checkAuth, deliveryController.getDelivererById)

  export default router;