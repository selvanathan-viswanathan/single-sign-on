import * as mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
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
    },
    passwordSalt: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    roles: {
        type: [String],
        enum: ['super-admin', 'admin', 'user']
    }
});

userSchema.pre('save', function userPreSaveHook(next){
    this.updatedAt(Date.now());
    next();
});
const userModel = mongoose.model("UserModel", userSchema);

export default userModel;