import express from "express";
import {
  registerController,
  loginController,
  forgotPasswordController,
  userUpdateController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  getAllUsersController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/admin-auth", requireSignIn, isAdmin, (request, response) => {
  return response.status(200).send({ ok: true });
});
router.post("/forgot-password", forgotPasswordController);
router.put('/update-user',requireSignIn,userUpdateController)
router.get('/orders',requireSignIn,getOrdersController);
router.get('/all-orders', requireSignIn,isAdmin,getAllOrdersController);
router.put('/order-status/:orderId', requireSignIn,isAdmin,orderStatusController);
router.get('/users',getAllUsersController);

export default router;
