import express from "express";
import formidable from "express-formidable";
import {
    createOrderController,
    createProductController,
    deleteProductController,
    filterProductController,
    getPhotoController,
    productController,
    productCountController,
    productPageController,
    searchProductController,
    similarProductsController,
    singleProductController,
    stripePaymentController,
    updateProductController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
    "/create-product",
    requireSignIn,
    isAdmin,
    formidable(),
    createProductController
);
router.get("/products", productController);
router.get("/single-product/:slug", singleProductController);
router.get("/get-photo/:pid", getPhotoController);
router.delete(
    "/delete-product/:pid",
    requireSignIn,
    isAdmin,
    deleteProductController
);
router.put(
    "/update-product/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController
);
router.post("/payment", requireSignIn, stripePaymentController);
router.post("/create-order", requireSignIn, createOrderController);
router.post("/filter-product", filterProductController);
router.get("/product-count", productCountController);
router.get("/product-list/:page", productPageController);
router.get("/search/:key", searchProductController);
router.get("/:pid/:cid", similarProductsController);
export default router;
