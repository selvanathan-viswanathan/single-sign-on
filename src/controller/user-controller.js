import models from "../model";
import { onSuccess } from "../utilities/error-handler-util";
const ObjectId = require("mongoose").Types.ObjectId;

const { UserModel } = models;
export const getExistingUser = async (req, res, next) => {
  try {
    const {
      body: { email, username },
    } = req;
    const sanitizedEmail = email.trim().toLowerCase();
    if (!sanitizedEmail) {
      throw new ValidationError("Email is required", {
        field: "email",
        reason: "Required",
      });
    }
    const sanitizedUsername = username.trim().toLowerCase();
    if (!sanitizedUsername) {
      throw new ValidationError("Username is required", {
        field: "username",
        reason: "Required",
      });
    }
    const user = await UserModel.findOne({
      $or: [
        {
          email: sanitizedEmail,
        },
        {
          username: sanitizedUsername,
        },
      ],
    });
    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);

    return res.json({
      status: 500,
      message: "Something went wrong",
    });
  }
};

export const checkUsernameAvailability = async (req, res) => {
  try {
    const {
      body: { username },
    } = req;
    const sanitizedUsername = username.trim().toLowerCase();
    if (!sanitizedUsername) {
      throw new ValidationError("Username is required", {
        field: "username",
        reason: "Required",
      });
    }
    const user = await UserModel.findOne({
      username: sanitizedUsername,
    });
    if (user) {
      throw new ConflictError("Username is already taken", {
        field: "username",
      });
    }
    return onSuccess(res, "Username available", {
      isAvailable: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const createUser = async (req, res) => {
  try {
    const { body } = req;
    const { locals } = res;
    if (locals?.user) {
      return res.json({
        status: 429,
        message: "Seems like user exists with the given email. Try log-in",
      });
    }
    const user = new UserModel(body);
    const newUser = await user.save();
    return res.json(newUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!ObjectId.isValid(userId)) {
      return res.json({
        status: 400,
        message: "Invalid User Id",
      });
    }
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.json({
        status: 404,
        message: "User not found",
      });
    }
    return onSuccess(res, "Successfully fetched User Info", {
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
