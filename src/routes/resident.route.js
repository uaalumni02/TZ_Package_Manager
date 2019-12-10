import express from 'express';
import checkAuth from '../middleware/check-auth';

// import controller
import residentController from '../controllers/resident';

const router = express.Router();

router.route('/')
  .post(checkAuth, residentController.addNewResident)
  .get(checkAuth, residentController.getAllResidents)

  router.route('/:id')
  .get(checkAuth, residentController.getResidentById)
  .patch(checkAuth, residentController.editResident)
  .delete(checkAuth, residentController.deleteResident)

export default router;

