import express from 'express';
import checkAuth from '../middleware/check-auth';

// import controller
import packageController from '../controllers/package';

const router = express.Router();

router.route('/')
  .post(checkAuth, packageController.addPackage)
  .get(checkAuth, packageController.getAllPackages)

  router.route('/:id')
  .get(checkAuth, packageController.getPackageById)
  // .patch(checkAuth, packageController.editPackage)
  .patch(checkAuth, packageController.deliverPackage)
  .patch(checkAuth, packageController.deletePackage)

router.route('/:resident')
  .get(checkAuth, packageController.getPackageByResident)
  // .delete(checkAuth, packageController.deletePackage)

router.route('/:deliveryDate')
  .get(checkAuth, packageController.getPackageByDate);


export default router;