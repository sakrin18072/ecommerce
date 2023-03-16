import express from "express";
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);
router.put(
  "/update-category/:nameOfCategory",
  requireSignIn,
  isAdmin,
  updateCategoryController
);
router.get("/categories", categoryController);
router.get("/single-category/:slug", singleCategoryController);
router.delete(
  "/delete-category/:category",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);
export default router;
