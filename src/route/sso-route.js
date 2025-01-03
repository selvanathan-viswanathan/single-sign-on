import express from "express";
import { ssoAuthorize, token } from "../controller/auth-controller";
const router = express.Router();

router.post("/sso-authorize", ssoAuthorize);
router.post("/sso-authorize/token", token);

export default router;
