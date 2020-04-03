import express from "express";
import checkAuth from "../middleware/check-auth";
import checkIsAdmin from "../middleware/check-isAdmin";

// import controller
import packageController from "../controllers/package";

const router = express.Router();

router
  .route("/:id")
  .patch(checkAuth, checkIsAdmin, packageController.editPackage);

export default router;
