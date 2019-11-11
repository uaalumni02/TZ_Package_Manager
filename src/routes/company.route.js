import express from 'express';
import checkAuth from '../middleware/check-auth';

// import controller
import companyController from '../controllers/company';

const router = express.Router();

router.route('/')
  .post(checkAuth, companyController.addCompanyName)
  .get(checkAuth, companyController.allCompanies)

  router.route('/:id')
  .get(checkAuth, companyController.getCompanyById)

  export default router;