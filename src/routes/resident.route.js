import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import checkAuth from '../middleware/check-auth';

//import model
import Resident from '../models/resident';
// import controller
import residentController from '../controllers/resident';

const router = express.Router();

//get resident by ID
router.get('/:id', checkAuth, residentController.getResidentById);;
// Insert JSON straight into MongoDB
router.post('/', checkAuth, residentController.addNewResident);
//shows all data
router.get('/', checkAuth, residentController.getAllResidents);
//edit answer
router.patch('/:id', checkAuth, residentController.editResident);

export default router;