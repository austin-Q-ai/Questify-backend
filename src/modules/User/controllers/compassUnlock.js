import { errorResponse, successResponse } from "../../../utils";
import UserModel from "../model";
import TotalkeyModel from "../../Totalkey/model";
export const compassUnlockController = async (req, res) => {
  const { wallet } = req.body;

  try {
    const existingUser = await UserModel.findOne({ wallet });
    let totalKeyInfo = await TotalkeyModel.findById("64de2e6fde6b0f7dcbbf2ece");
    if (!existingUser.compass) {
      existingUser.compass = true;
      if (existingUser.level === 1) {
        existingUser.rewardKey[0] += 1;
        totalKeyInfo.claimedKey[0] += 1;
      }
      if (existingUser.level === 2) {
        existingUser.rewardKey[0] += 2;
        totalKeyInfo.claimedKey[0] += 2;
      }
      if (existingUser.level === 3) {
        existingUser.rewardKey[0] += 3;
        totalKeyInfo.claimedKey[0] += 3;
      }
      if (existingUser.level === 4) {
        existingUser.rewardKey[0] += 3;
        totalKeyInfo.claimedKey[0] += 3;
        existingUser.rewardKey[1] += 1;
        totalKeyInfo.claimedKey[1] += 1;
      }
      if (existingUser.level === 5) {
        existingUser.rewardKey[0] += 3;
        totalKeyInfo.claimedKey[0] += 3;
        existingUser.rewardKey[1] += 1;
        totalKeyInfo.claimedKey[1] += 1;
        existingUser.rewardKey[2] += 1;
        totalKeyInfo.claimedKey[2] += 1;
      }

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
