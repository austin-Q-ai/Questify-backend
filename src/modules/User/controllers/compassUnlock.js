import { errorResponse, successResponse } from "../../../utils";
import UserModel from "../model";

export const compassUnlockController = async (req, res) => {
  const { wallet } = req.body;

  try {
    const existingUser = await UserModel.findOne({ wallet });

    if (!existingUser.compass) {
      existingUser.compass = true;
      existingUser.totalBalance -= 20;
      await existingUser.save();

      return successResponse({
        res,
        response: { existingUser },
      });
    } else {
      return errorResponse({ res, err: "Cannot find User!" });
    }
  } catch (err) {
    console.log(err);
    return errorResponse({ res, err: "Something went wrong!" });
  }
};
