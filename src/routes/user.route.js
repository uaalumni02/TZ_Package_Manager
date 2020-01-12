import express from 'express';
import checkAuth from '../middleware/check-auth';

// import controller
import userController from '../controllers/user';

const router = express.Router();


//user login
router.post('/login', userController.userLogin);

router.route('/')
  .post(userController.addUser)
  .get(checkAuth, userController.getAllUsers)

  router.route('/:id')
  .delete(checkAuth, userController.deleteUser)
  .get(checkAuth, userController.getUserById)
  .patch(checkAuth, userController.approveUser)

export default router;