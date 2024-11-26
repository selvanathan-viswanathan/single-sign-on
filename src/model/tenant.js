import mongoose from 'mongoose';
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';

const tenantSchema = new mongoose.Schema({
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

tenantSchema.pre("save", function tenantPreSaveHook(next) {
    this.clientId = uuidv4();
    this.clientSecret = uuidv6();
    next();
});
const tenantModel = mongoose.model("tenantModel", tenantSchema);

export default tenantModel;