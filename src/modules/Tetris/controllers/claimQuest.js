import { errorResponse, successResponse } from "../../../utils";
import UserModel from "../../User/model";

export const claimQuestController = async (req, res) => {
  let { wallet, index } = req.body;
  index -= 8;
  console.log(wallet, index);

  try {
    const existingUser = await UserModel.findOne({ wallet });
    const maxQuests = [1, 7, 10, 1, 1, 1, 1];

    if (
      existingUser &&
      existingUser.achievedQuests.tetris[index] === maxQuests[index] &&
      existingUser.claimedQuests.tetris[index] === 0
    ) {
      switch (index) {
        case 0:
          existingUser.totalXP += 20;
          break;
        case 1:
          existingUser.totalXP += 100;
          break;
        case 2:
          existingUser.totalXP += 100;
          break;
        case 3:
          existingUser.totalXP += 50;
          break;
        case 4:
          existingUser.totalXP += 50;
          break;
        case 5:
          existingUser.totalXP += 50;
          break;
        case 6:
          existingUser.totalXP += 50;
          break;
        default:
          console.log("error in index");
          break;
      }

      existingUser.claimedQuests.tetris[index] = 1;
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
