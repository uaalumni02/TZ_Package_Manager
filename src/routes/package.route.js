import express from "express";
import checkAuth from "../middleware/check-auth";
import checkIsAdmin from "../middleware/check-isAdmin";

// import controller
import packageController from "../controllers/package";

const router = express.Router();

router
  .route("/")
  .post(checkAuth, checkIsAdmin, packageController.addPackage)
  .get(checkAuth, checkIsAdmin, packageController.getAllPackages)

router
  .route("/:id")
  .get(checkAuth, checkIsAdmin, packageController.getPackageById)
  .patch(checkAuth, checkIsAdmin, packageController.deliverPackage)
// .delete()

router
  .route("/:resident")
  .get(checkAuth, checkIsAdmin, packageController.getPackageByResident)

router
  .route("/:deliveryDate")
  .get(checkAuth, checkIsAdmin, packageController.getPackageByDate)

export default router;
