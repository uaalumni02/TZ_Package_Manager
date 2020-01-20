import express from "express";
import checkAuth from "../middleware/check-auth";
import checkIsAdmin from "../middleware/check-isAdmin";

// import controller
import packageController from "../controllers/package";

const router = express.Router();

router
  .route("/")
  .post(checkAuth, checkIsAdmin, packageController.addPackage)
  .get(checkAuth, checkIsAdmin, packageController.getAllPackages);

router
  .route("/:id")
  .get(checkAuth, checkIsAdmin, packageController.getPackageById)
  // .patch(checkAuth, packageController.editPackage)
  .patch(checkAuth, checkIsAdmin, packageController.deliverPackage)
  .patch(checkAuth, checkIsAdmin, packageController.deletePackage);

router
  .route("/:resident")
  .get(checkAuth, checkIsAdmin, packageController.getPackageByResident);
// .delete(checkAuth, packageController.deletePackage)

router
  .route("/:deliveryDate")
  .get(checkAuth, checkIsAdmin, packageController.getPackageByDate);

export default router;
