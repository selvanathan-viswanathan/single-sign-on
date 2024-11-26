import express from "express";
import { createUser } from "../controller/user-controller";
const router = express.Router();
import { checkSchema, validationResult } from "express-validator";
import { userCreationValidatorSchema } from "../utilities/validator-object";

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
