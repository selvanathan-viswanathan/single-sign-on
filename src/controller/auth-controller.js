import { onSuccess } from "../utilities/error-handler-util.js";
import { verifyToken } from "../utilities/jwt-util.js";

export const login = async (req, res, next) => {
  try {
    const user = res.locals.user;
    if (!user) {
      // throw not authorized error
      throw new Error("Unauthorised access");
    }
    const { password } = req.body;
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }
    const token = await user.generateToken({
      id: user._id,
      email: user.email,
    });
    return onSuccess(res, "Login successful", { token, user });
  } catch (error) {
    next(error);
  }
};

export const authorize = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(" ")?.[1] || "";
    if (!token) {
      // throw not authorized error
      throw new Error("Unauthorised access");
    }
    const isAuthorised = await verifyToken(token);
    if (!isAuthorised) {
      throw new Error("Unauthorised access");
    }
    next();
  } catch (error) {
    next(error);
  }
};
