import express from "express";
import authRoute from "./auth-route";
import clientRoute from "./client-route";
import scopeRoute from "./scope-route";
import ssoRoute from "./sso-route";
import userRoute from "./user-route";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/client", clientRoute);
router.use("/scope", scopeRoute);
router.use("/", ssoRoute);

export default router;
