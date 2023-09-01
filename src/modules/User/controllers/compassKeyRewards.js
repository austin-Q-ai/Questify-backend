import { errorResponse, successResponse } from "../../../utils";
import UserModel from "../model";

export const compassKeyRewardsController = async (req, res) => {
  const { wallet, questID } = req.body;

  try {
    let existingUser = await UserModel.findOne({ wallet });
    if (!existingUser) {
      return errorResponse({
        res,
        message: "User with that wallet address don't exist",
      });
    }

    existingUser.premiumKey += 1;
    existingUser.claimedQuests.lootbox[questID] = 1;
    await existingUser.save();

    return successResponse({
      res,
      response: { user: existingUser },
    });
  } catch (err) {
    return errorResponse({ res, err });
  }
};
