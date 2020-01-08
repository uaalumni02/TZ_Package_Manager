import express from 'express';
import checkAuth from '../middleware/check-auth';

// import controller
import adminController from '../controllers/admin';

const router = express.Router();


router.post('/login', adminController.adminLogin);

router.route('/')
  .post(adminController.addAdmin)
  .get(checkAuth, adminController.getAllAdmins)

  router.route('/:id')
  .delete(checkAuth, adminController.deleteAdmin)
  .get(checkAuth, adminController.getAdminById)

export default router;