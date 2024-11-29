import express from "express";
import { checkSchema, validationResult } from "express-validator";
import { authorize } from "../controller/auth-controller";
import {
  createUser,
  getExistingUser,
  getUserById,
  updateUpartialUserById,
} from "../controller/user-controller";
import { ValidationError } from "../utilities/error-handler-util";
import { userCreationValidatorSchema } from "../utilities/validator-object";
const router = express.Router();

router
  .post(
    "/",
    [
      checkSchema(userCreationValidatorSchema),
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
    ],
    getExistingUser,
    createUser
  )
  .get("/:userId", authorize, getUserById)
  .patch("/:userId", authorize, getExistingUser, updateUpartialUserById);

export default router;
