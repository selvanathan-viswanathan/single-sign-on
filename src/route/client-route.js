import express from "express";
import {
  createClient,
  deleteClient,
  getClientById,
  getClients,
  getExistingClient,
  updateClient,
} from "../controller/client-controller";
import { clientValidatorObj } from "../utilities/validator-object";

const router = express.Router();

router.post("", getExistingClient, clientValidatorObj, createClient);
router.get("", getClients);
router.get("/:clientId", getClientById);
router.put("/:clientId", getExistingClient, clientValidatorObj, updateClient);
router.delete("/:clientId", getExistingClient, deleteClient);

export default router;
