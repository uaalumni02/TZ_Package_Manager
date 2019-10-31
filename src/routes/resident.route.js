import express from 'express';
import checkAuth from '../middleware/check-auth';


//import model
import Resident from '../models/resident';
// import controller
import residentController from '../controllers/resident';

const router = express.Router();

router.route('/')
  .post(checkAuth, residentController.addNewResident)
  .get(checkAuth, residentController.getAllResidents)

  router.route('/:id')
  .get(checkAuth, residentController.getResidentById)
  .patch(checkAuth, residentController.editResident)

export default router;

