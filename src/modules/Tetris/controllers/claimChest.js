import { errorResponse, successResponse } from "../../../utils";
import UserModel from "../../User/model";

export const claimChestController = async (req, res) => {
  let { wallet } = req.body;

  try {
    const existingUser = await UserModel.findOne({ wallet });

    if (existingUser && existingUser.playCount.tetris === 4) {
      const boost = Math.floor(Math.random() * 10 + 1) / 100;
      existingUser.playCount.tetris = 0;
      existingUser.totalBalance += boost;
      await existingUser.save();

      delete existingUser.loginHistory;

      return successResponse({
        res,
        response: { boost, existingUser },
      });
    } else {
      return errorResponse({ res, err: "Cannot find User!" });
    }
  } catch (err) {
    console.log(err);
    return errorResponse({ res, err: "Something went wrong!" });
  }
};
