import express from "express";
import { authorize } from "../controller/auth-controller";
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

router.post("", authorize, getExistingClient, clientValidatorObj, createClient);
router.get("", authorize, getClients);
router.get("/:clientId", authorize, getClientById);
router.put(
  "/:clientId",
  authorize,
  getExistingClient,
  clientValidatorObj,
  updateClient
);
router.delete("/:clientId", authorize, getExistingClient, deleteClient);

export default router;
