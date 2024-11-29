import models from "../model";
import { ConflictError, onSuccess } from "../utilities/error-handler-util";

const { ScopeModel } = models;

export const getExistingScope = async (req, res, next) => {
  try {
    const {
      body: { name },
    } = req;
    const { scopeId } = req.params;
    let query = {
      _id: scopeId,
    };
    const sanitizedName = name?.trim().toLowerCase();
    if (!scopeId) {
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
    const scope = await ScopeModel.findOne(query).lean();
    res.locals.scope = scope;
    console.log("exisiting scope :: ", res.locals, query);

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const createScope = async (req, res, next) => {
  try {
    if (res.locals?.scope) {
      throw new ConflictError("Scope name is already taken", {
        field: "name",
      });
    }
    const { name, description } = req.body;
    const scope = new ScopeModel({
      name,
      description,
    });
    const newScope = await scope.save();
    return onSuccess(res, "Scope created successfully", newScope);
  } catch (error) {
    next(error);
  }
};

export const getScopes = async (req, res, next) => {
  try {
    const { limit = 10, page = 0 } = req.query;
    const clients = await ScopeModel.find()
      .skip(limit * page)
      .limit(limit);
    return onSuccess(res, "Scopes retrieved successfully", clients);
  } catch (error) {
    next(error);
  }
};

export const getScopeById = async (req, res, next) => {
  try {
    const { scopeId } = req.params;
    const scope = await ScopeModel.findById(scopeId);
    if (!scope) {
      throw new NotFoundError("Scope not found");
    }
    return onSuccess(res, "Scope retrieved successfully", scope);
  } catch (error) {
    next(error);
  }
};

export const updateScope = async (req, res, next) => {
  try {
    const { scopeId } = req.params;
    const updateScope = req.body;
    const scope = res.locals?.scope;
    if (!scope) {
      throw new NotFoundError("Scope not found");
    }
    await ScopeModel.findByIdAndUpdate(scopeId, updateScope);
    return onSuccess(res, "Scope updated successfully", updateScope);
  } catch (error) {
    next(error);
  }
};

export const deleteScope = async (req, res, next) => {
  try {
    const { scopeId } = req.params;
    const deletedScope = await ScopeModel.findByIdAndDelete(scopeId);

    if (!deletedScope) {
      throw new NotFoundError("Scope not found");
    }
    return onSuccess(res, "Scope deleted successfully", true);
  } catch (error) {
    next(error);
  }
};
