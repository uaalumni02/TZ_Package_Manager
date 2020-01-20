import express from "express";
import checkAuth from "../middleware/check-auth";
import checkIsAdmin from "../middleware/check-isAdmin";

// import controller
import companyController from "../controllers/company";

const router = express.Router();

router
  .route("/")
  .post(checkAuth, checkIsAdmin, companyController.addCompanyName)
  .get(checkAuth, checkIsAdmin, companyController.allCompanies);

router
  .route("/:id")
  .get(checkAuth, checkIsAdmin, companyController.getCompanyById);

export default router;
