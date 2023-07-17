import { errorResponse, successResponse } from "../../../utils";
import UserModel from "../model";

export const tempLoginController = async (req, res) => {
  let { wallet } = req.body;

  if (wallet === "template") {
    console.log("User should connect wallet!");
    return successResponse({ res, response: { success: true } });
  }

  try {
    const existingUser = await UserModel.findOne({ wallet });

    if (existingUser) {
      existingUser.loginHistory.push(new Date());
      const lastTwoHistory = existingUser.loginHistory.slice(-2);

      console.log(lastTwoHistory);

      if (lastTwoHistory.length === 1) {
        existingUser.achievedQuests.questify[0] = 1;
        existingUser.achievedQuests.questify[1] = 1;
      } else if (existingUser.achievedQuests.questify[1] < 7) {
        const date1 = new Date(lastTwoHistory[0].time);
        date1.setHours(0, 0, 0, 0);
        const date2 = new Date(lastTwoHistory[1].time);
        date2.setHours(0, 0, 0, 0);

        if (Math.abs(date1.getTime() - date2.getTime()) === 86400000) {
          existingUser.achievedQuests.questify[1] += 1;
        } else if (Math.abs(date1.getTime() - date2.getTime()) > 86400000) {
          existingUser.achievedQuests.questify[1] = 1;
        }
      }

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
      newUser.loginHistory.push(new Date());
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
