import express from 'express';
import mongoose from 'mongoose';

//import model
import Resident from '../models/resident';
// import controller
import residentController from '../controllers/resident';

const router = express.Router();

//get resident by ID
router.get('/:id', residentController.getResidentById);;
// Insert JSON straight into MongoDB
router.post('/', residentController.addNewResident);
//shows all data
router.get('/', residentController.getAllResidents);
//edit answer
router.patch('/:id', residentController.editResident);

export default router;