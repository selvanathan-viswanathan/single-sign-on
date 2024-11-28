import express from "express";
import { checkSchema, validationResult } from "express-validator";
import {
  createUser,
  getExistingUser,
  getUserById,
} from "../controller/user-controller";
import { userCreationValidatorSchema } from "../utilities/validator-object";
const router = express.Router();

router.post(
  "/",
  [
    checkSchema(userCreationValidatorSchema),
    (req, res, next) => {
      const errors = validationResult(req);
      console.log(req.body);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() });
      }
      next();
    },
  ],
  getExistingUser,
  createUser
);
router.get("/:userId", getUserById);

export default router;
