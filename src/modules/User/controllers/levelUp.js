import { errorResponse, successResponse } from "../../../utils";
import UserModel from "../model";

export const levelUpController = async (req, res) => {
  const { wallet } = req.body;
  console.log(wallet);

  try {
    const existingUser = await UserModel.findOne({ wallet });

    if (existingUser) {
      let level =
        existingUser.totalXP < 500
          ? 1
          : Math.floor(Math.log2(existingUser.totalXP / 500)) + 2;

      level = level > 5 ? 5 : level;

      const reward = 2 * (level - 1);

      existingUser.level = level;
      existingUser.totalBalance += reward;

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
