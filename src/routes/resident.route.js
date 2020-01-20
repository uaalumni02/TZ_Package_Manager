import express from "express";
import checkAuth from "../middleware/check-auth";
import checkIsAdmin from "../middleware/check-isAdmin";

// import controller
import residentController from "../controllers/resident";

const router = express.Router();

router
  .route("/")
  .post(checkAuth, checkIsAdmin, residentController.addNewResident)
  .get(checkAuth, checkIsAdmin, residentController.getAllResidents);

router
  .route("/:id")
  .get(checkAuth, checkIsAdmin, residentController.getResidentById)
  .patch(checkAuth, checkIsAdmin, residentController.deleteResident)
  .patch(checkAuth, checkIsAdmin, residentController.editResident);

export default router;
