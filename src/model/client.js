import mongoose from 'mongoose';
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';

const { Schema } = mongoose;
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
    hostUri: {
        type: [String],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    updatedBy: {
        type: String,
        default: 'self'
    },
    createdBy: {
        type: String,
        default: 'self'
    }
});

clientSchema.pre("save", function clientPreSaveHook(next) {
    this.clientId = uuidv4();
    this.clientSecret = uuidv6();
    next();
});
const ClientModel = mongoose.model("ClientModel", clientSchema);

export default ClientModel;