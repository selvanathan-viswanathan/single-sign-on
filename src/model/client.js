import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  clientId: {
    type: String,
    required: true,
  },
  clientSecret: {
    type: String,
    required: true,
  },
  allowedGrants: {
    type: [String],
  },
  redirectUri: {
    type: [String],
  },
  logoutUri: {
    type: [String],
  },
  hostUri: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  updatedBy: {
    type: String,
    default: "self",
  },
  createdBy: {
    type: String,
    default: "self",
  },
});

clientSchema.pre("save", function clientSchemaPreSaveHook(next) {
  this.updatedAt = Date.now();
  next();
});

const ClientModel = mongoose.model("ClientModel", clientSchema);

export default ClientModel;
