import { errorResponse, successResponse } from "../../../utils";
import UserModel from "../model";

export const claimQuestController = async (req, res) => {
  let { wallet, index } = req.body;
  console.log(wallet, index);

  try {
    const existingUser = await UserModel.findOne({ wallet });
    const maxQuests = [1, 7, 1, 5];

    if (
      existingUser &&
      existingUser.achievedQuests.questify[index] === maxQuests[index] &&
      existingUser.claimedQuests.questify[index] === 0
    ) {
      switch (index) {
        case 0:
          existingUser.totalXP += 50;
          break;
        case 1:
          existingUser.totalXP += 300;
          break;
        case 2:
          existingUser.totalXP += 50;
          break;
        case 3:
          existingUser.totalXP += 200;
          break;
        default:
          console.log("error in index");
          break;
      }

      existingUser.claimedQuests.questify[index] = 1;
      await existingUser.save();

      return successResponse({
        res,
        response: { existingUser },
      });
    } else {
      return errorResponse({ res, err: "This user cannot claim quest!" });
    }
  } catch (err) {
    console.log(err);
    return errorResponse({ res, err: "Something went wrong!" });
  }
};
