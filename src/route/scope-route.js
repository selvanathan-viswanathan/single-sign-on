import express from "express";
import { authorize } from "../controller/auth-controller";
import {
  createScope,
  deleteScope,
  getExistingScope,
  getScopeById,
  getScopes,
  updateScope,
} from "../controller/scope-controller";
import { scopeValidatorObj } from "../utilities/validator-object";

const router = express.Router();

router.post("", authorize, getExistingScope, scopeValidatorObj, createScope);
router.get("", authorize, getScopes);
router.get("/:scopeId", authorize, getScopeById);
router.put(
  "/:scopeId",
  authorize,
  getExistingScope,
  scopeValidatorObj,
  updateScope
);
router.delete("/:scopeId", authorize, getExistingScope, deleteScope);

export default router;
