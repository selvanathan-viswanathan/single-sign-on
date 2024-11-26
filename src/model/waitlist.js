import mongoose from 'mongoose';
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';

const waitlistSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    isApproved: {
        type: Boolean,
        default: false
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

const waitlistModel = mongoose.model("waitlistModel", waitlistSchema);

export default waitlistModel;