import models from "../model";
import {
  ConflictError,
  NotFoundError,
  onSuccess,
} from "../utilities/error-handler-util";
const ObjectId = require("mongoose").Types.ObjectId;

const { UserModel } = models;

export const getExistingUser = async (req, res, next) => {
  try {
    const {
      body: { email, username },
    } = req;
    const { userId } = req.params;
    let query = {
      _id: userId,
    };
    const sanitizedEmail = email?.trim().toLowerCase();
    const sanitizedUsername = username?.trim().toLowerCase();
    if (!userId) {
      if (!sanitizedEmail) {
        throw new ValidationError("Email is required", {
          field: "email",
          reason: "Required",
        });
      }
      if (!sanitizedEmail && !sanitizedUsername) {
        throw new ValidationError("Username is required", {
          field: "username",
          reason: "Required",
        });
      }
      query = {
        $or: [
          {
            email: sanitizedEmail,
          },
          {
            username: sanitizedUsername,
          },
        ],
      };
    }
    const user = await UserModel.findOne(query);
    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const checkUsernameAvailability = async (req, res, next) => {
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

export const createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const { locals } = res;
    if (locals?.user) {
      throw new ConflictError(
        "Seems like user exists with the given email. Try log-in",
        {
          field: "username or email",
        }
      );
    }
    const user = new UserModel(body);
    const newUser = await user.save();
    return res.json(newUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!ObjectId.isValid(userId)) {
      throw new ValidationError("Invalid User Id", {
        field: "user Id",
        reason: "Invalid",
      });
    }
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
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

export const updateUpartialUserById = async (req, res, next) => {
  try {
    const { params, body } = req;
    const { userId } = params;
    const { firstName, lastName } = body;
    const { locals } = res;
    const payload = {
      ...locals.user,
      firstName: firstName || locals?.user?.firstName,
      lastName: lastName || locals?.user?.lastName,
    };
    await UserModel.findByIdAndUpdate(userId, payload);
    return onSuccess(res, "Successfully updated User", payload);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
