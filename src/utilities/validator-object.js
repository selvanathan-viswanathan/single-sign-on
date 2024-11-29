import { check, validationResult } from "express-validator";
import { ValidationError } from "./error-handler-util";

export var userValidatorObj = {
  username: {
    isLength: {
      options: { min: 5 },
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
export var userCreationValidatorSchema = {
  ...userValidatorObj,
  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: "Password should be at least 8 chars",
    },
  },
};

export const clientValidatorObj = [
  check("name").isString(),
  check("hostUri").isString(),
  check("allowedGrants").isArray(),
  check("redirectUri").isArray(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = errors.mapped();
      throw new ValidationError(
        "Incorrect data",
        Object.keys(err).map((errField) => ({
          field: errField,
          reason: err[errField]?.msg,
        }))
      );
    }
    next();
  },
];
