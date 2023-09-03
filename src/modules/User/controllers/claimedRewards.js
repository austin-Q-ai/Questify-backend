import { errorResponse, successResponse } from "../../../utils";
import UserModel from "../model";
import TotalkeyModel from "../../Totalkey/model";

export const claimedRewardsController = async (req, res) => {
  const { wallet, keyID, rewardID, rewardAmount, premiumState } = req.body;
  console.log(wallet, keyID, rewardID, rewardAmount, premiumState);
  try {
    let existingUser = await UserModel.findOne({ wallet });
    let totalKeyInfo = await TotalkeyModel.findById("64de2e6fde6b0f7dcbbf2ece");
    if (!existingUser) {
      return errorResponse({
        res,
        message: "User with that wallet address don't exist",
      });
    }
    if (premiumState === "true" && keyID === 2) {
      if (existingUser.premiumKey < 1) {
        return errorResponse({
          res,
          message: "The amount of key is not enough!",
        });
      }
      existingUser.premiumKey -= 1;
    } else {
      if (existingUser.rewardKey[keyID] < 1)
        return errorResponse({
          res,
          message: "The amount of key is not enough!",
        });
      existingUser.rewardKey[keyID] -= 1;
    }

    if (rewardID === 1) existingUser.totalStar += rewardAmount;
    if (rewardID === 5) existingUser.totalBalance += rewardAmount;
    // if(totalKeyInfo['claimedKey'][keyID]+1>totalKeyInfo['totalKey'][keyID]) return errorResponse({ res, message:'The amount of Key is not enough!' });
    // totalKeyInfo['claimedKey'][keyID]+=1;
    if (
      totalKeyInfo["claimedRewards"][rewardID] + rewardAmount >
      totalKeyInfo["totalRewards"][rewardID]
    )
      return errorResponse({
        res,
        message: "The amount of Rewards is not enough!",
      });
    totalKeyInfo["claimedRewards"][rewardID] += rewardAmount;
    existingUser.claimedRewards[rewardID] += rewardAmount;
    await existingUser.save();
    await totalKeyInfo.save();

    return successResponse({
      res,
      response: { user: existingUser, totalKeyInfo: totalKeyInfo },
    });
  } catch (err) {
    return errorResponse({ res, err });
  }
};
