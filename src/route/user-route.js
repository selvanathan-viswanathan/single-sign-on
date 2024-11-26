import express from "express";
import { createUser } from "../controller/user-controller";
const router = express.Router();
import { checkSchema, validationResult } from "express-validator";
var userValidatorObj = {
  userName: {
    isLength: {
      options: { min: 8 },
      errorMessage: "Invalid username",
    },
  },
  firstName: {
    errorMessage: "Please enter first name",
    isEmpty: { negated: true },
  },
  lastName: {
    errorMessage: "Please enter first name",
    isEmpty: { negated: true },
  },
  email: {
    errorMessage: "Invalid email",
    isEmail: true,
  },
};
var userCreationValidatorSchema = {
  ...userValidatorObj,
  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: "Password should be at least 8 chars",
    },
  },
};

router.post(
  "/",
  [
    checkSchema(userCreationValidatorSchema),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
      }
      next();
    },
  ],
  createUser
);

export default router;
