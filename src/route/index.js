import express from "express";
import clientRoute from "./client-route";
import userRoute from "./user-route";

const router = express.Router();
router.use("/user", userRoute);
router.use("/client", clientRoute);

export default router;
