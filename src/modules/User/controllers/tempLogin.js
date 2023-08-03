import { errorResponse, successResponse } from "../../../utils";
import UserModel from "../model";

export const tempLoginController = async (req, res) => {
  let { wallet } = req.body;
  console.log("💖father")
  if (wallet === "template") {
    console.log("User should connect wallet!");
    return successResponse({ res, response: { success: true } });
  }

  try {
    const existingUser = await UserModel.findOne({ wallet });
    existingUser.achievedQuests.questify[0] = 1;
    

    if (existingUser) {
      const today = new Date().setHours(0, 0, 0, 0);
      const lastActivityDate = existingUser.lastActivityDate;
      
      if (lastActivityDate) {
        
        if (today - lastActivityDate === 24 * 60 * 60 * 1000) {
          existingUser.achievedQuests.questify[1] += 1;
        } else if (today - lastActivityDate > 24 * 60 * 60 * 1000) {
          // User missed a day, reset the streak count
          existingUser.achievedQuests.questify[1] = 1;
        }
        // User has activity on consecutive days, no action needed
      } else {
        // First activity, set the streak count to 1
        existingUser.achievedQuests.questify[1]=1;
      }
      
      existingUser.lastActivityDate = today;

      await existingUser.save();
      console.log(`Updated user with wallet ${wallet}`);

      return successResponse({
        res,
        response: { data: existingUser },
      });
    } else {
      const newUser = new UserModel({
        wallet,
        achievedQuests: { questify: [1, 1, 0, 0] },
      });
      existingUser.lastActivityDate = new Date().setHours(0, 0, 0, 0);
      await newUser.save();
      console.log(`Created new user with wallet ${wallet}`);
      return successResponse({
        res,
        response: { data: newUser },
      });
    }
  } catch (err) {
    return errorResponse({ res, err });
  }
};
