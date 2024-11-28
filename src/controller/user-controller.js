import models from "../model";
const ObjectId = require("mongoose").Types.ObjectId;

const { UserModel } = models;
export const getExistingUser = async (req, res, next) => {
  try {
    const {
      body: { email, username },
    } = req;
    const sanitizedEmail = email.trim().toLowerCase();
    if (!sanitizedEmail) {
      return res.json({
        status: 400,
        message: "email is empty",
      });
    }
    const sanitizedUsername = username.trim().toLowerCase();
    if (!sanitizedUsername) {
      return res.json({
        status: 400,
        message: "username is empty",
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
      return res.json({
        status: 400,
        message: "username is empty",
      });
    }
    const user = await UserModel.findOne({
      username: sanitizedUsername,
    });
    if (user) {
      return res.json({
        status: 429,
        message: "Username already taken",
        data: {
          isAvailable: false,
        },
      });
    }
    return res.json({
      message: "Username available",
      data: {
        isAvailable: true,
      },
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      message: "Something went wrong",
    });
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
    return res.json({
      status: 500,
      message: "Something went wrong",
    });
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
    return res.json({
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      message: "Something went wrong",
    });
  }
};
