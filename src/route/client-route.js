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
router.get(":id", getClientById);
router.put(":id", getExistingClient, clientValidatorObj, updateClient);
router.delete(":id", getExistingClient, deleteClient);

export default router;
