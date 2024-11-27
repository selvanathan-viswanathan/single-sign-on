import * as mongoose from 'mongoose';
const scopeSchema = new mongoose.Schema({
    scope: {
        type: String,
        required: true,
    },
    description: {
        type: String,
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
});

scopeSchema.pre('save', function scopeSchemaPreSaveHook(next){
    this.updatedAt(Date.now());
    next();
});
const scopeSchemaModel = mongoose.model("ScopeModel", scopeSchemaSchema);

export default scopeSchemaModel;