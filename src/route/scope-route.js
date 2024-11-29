import express from "express";
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

router.post("", getExistingScope, scopeValidatorObj, createScope);
router.get("", getScopes);
router.get("/:scopeId", getScopeById);
router.put("/:scopeId", getExistingScope, scopeValidatorObj, updateScope);
router.delete("/:scopeId", getExistingScope, deleteScope);

export default router;
