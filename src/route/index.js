import express from "express";
import clientRoute from "./client-route";
import scopeRoute from "./scope-route";
import userRoute from "./user-route";

const router = express.Router();
router.use("/user", userRoute);
router.use("/client", clientRoute);
router.use("/scope", scopeRoute);

export default router;
