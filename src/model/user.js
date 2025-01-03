import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import { jwtSign } from "../utilities/jwt-util";

const { Schema } = mongoose;
const SALT_WORK_FACTOR = Number(process.env.SALT_WORK_FACTOR);
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  profilePic: {
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
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    enum: ["super-admin", "admin", "user"],
  },
});

userSchema.pre("save", function userPreSaveHook(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      user.updatedAt = Date.now();
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.jwtSign = jwtSign;

const UserModel = mongoose.model("UserModel", userSchema);

export default UserModel;
