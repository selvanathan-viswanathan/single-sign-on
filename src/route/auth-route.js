import express from "express";
import { login } from "../controller/auth-controller";
import { getExistingUser } from "../controller/user-controller";
const router = express.Router();

router.post("/login", getExistingUser, login);

export default router;
