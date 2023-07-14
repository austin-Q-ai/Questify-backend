import express from "express";
import { validateSchema } from "../../middlewares";
// import { getTweets } from "./controller";
import {
  updateFieldsController,
  updateArrayFieldController,
} from "./controller";

const router = express.Router();

router.post("/updateFields", updateFieldsController);
router.post("/updateArrayField", updateArrayFieldController);

export { router as testModule };
