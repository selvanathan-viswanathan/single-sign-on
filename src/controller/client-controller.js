import { v4 as uuidv4, v6 as uuidv6 } from "uuid";
import models from "../model";
import {
  ConflictError,
  NotFoundError,
  onSuccess,
} from "../utilities/error-handler-util";

const { ClientModel } = models;

export const getExistingClient = async (req, res, next) => {
  try {
    const {
      body: { name },
    } = req;
    const { clientId } = req.params;
    let query = {
      _id: clientId,
    };
    const sanitizedName = name?.trim().toLowerCase();
    if (!clientId) {
      if (!sanitizedName) {
        throw new ValidationError("Name is required", {
          field: "name",
          reason: "Required",
        });
      }
      query = {
        name: sanitizedName,
      };
    }
    const client = await ClientModel.findOne(query).lean();

    res.locals.client = client;
    console.log("Client i find api :: ", client, res.locals, query);
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const createClient = async (req, res, next) => {
  try {
    if (res.locals?.client) {
      throw new ConflictError("Client name is already taken", {
        field: "name",
      });
    }
    const { name, allowedGrants, redirectUri, hostUri } = req.body;
    const client = new ClientModel({
      name,
      allowedGrants,
      redirectUri,
      hostUri,
      clientId: uuidv4(),
      clientSecret: uuidv6(),
    });
    const newClient = await client.save();
    return onSuccess(res, "Client created successfully", newClient);
  } catch (error) {
    next(error);
  }
};

export const getClients = async (req, res, next) => {
  try {
    const { limit = 10, page = 0 } = req.query;
    const clients = await ClientModel.find()
      .skip(limit * page)
      .limit(limit);
    return onSuccess(res, "Clients retrieved successfully", clients);
  } catch (error) {
    next(error);
  }
};

export const getClientById = async (req, res, next) => {
  try {
    const { clientId } = req.params;
    const client = await getClientByIdService(clientId);
    if (!client) {
      throw new NotFoundError("Client not found");
    }

    return onSuccess(res, "Client retrieved successfully", client);
  } catch (error) {
    next(error);
  }
};

export const updateClient = async (req, res, next) => {
  try {
    const { clientId } = req.params;
    const updateData = req.body;
    const client = res.locals?.client;
    if (!client) {
      throw new NotFoundError("Client not found");
    }
    const updatedClient = await ClientModel.findByIdAndUpdate(
      clientId,
      updateData,
      {
        new: true,
      }
    );
    return onSuccess(res, "Client updated successfully", updatedClient);
  } catch (error) {
    next(error);
  }
};

export const deleteClient = async (req, res, next) => {
  try {
    const { clientId } = req.params;
    const deletedClient = await ClientModel.findByIdAndDelete(clientId);

    if (!deletedClient) {
      throw new NotFoundError("Client not found");
    }
    return onSuccess(res, "Client deleted successfully", true);
  } catch (error) {
    next(error);
  }
};
