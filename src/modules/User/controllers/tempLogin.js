import { errorResponse, successResponse } from "../../../utils";
import UserModel from "../model";

export const tempLoginController = async (req, res) => {
  let { wallet } = req.body;
  try {
    const existingUser = await UserModel.findOne({ wallet });

    if (existingUser) {
      const lastTwoHistory = existingUser.loginHistory.slice(-2);
      if (lastTwoHistory === []) existingUser.achievedQuests.questify[0] = 1;
      existingUser.loginHistory.push(new Date());

      if (existingUser.achievedQuests.questify[1] < 7) {
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
    } else {
      const newUser = new UserModel({
        wallet,
        achievedQuests: { questify: [1, 1, 0, 0] },
      });
      newUser.loginHistory.push(new Date());
      await newUser.save();
      console.log(`Created new user with wallet ${wallet}`);
    }

    // --Logic for Daily Streak and Weekly Streak--

    if (lastTwoHistory.length == 1) {
      existingUser.trackedQuests[0] = 1;
      existingUser.receivedQuests[0] = 0;
      existingUser.trackedQuests[1] = 1;
    } else {
      const date1 = new Date(lastTwoHistory[0]);
      date1.setHours(0, 0, 0, 0);
      const date2 = new Date(lastTwoHistory[1]);
      date2.setHours(0, 0, 0, 0);
      if (Math.abs(date1.getTime() - date2.getTime()) === 86400000) {
        existingUser.trackedQuests[0] = 1;
        existingUser.receivedQuests[0] = 0;
        if (!existingUser.receivedQuests[1]) existingUser.trackedQuests[1] += 1;
      } else if (Math.abs(date1.getTime() - date2.getTime()) > 86400000) {
        existingUser.trackedQuests[0] = 1;
        existingUser.receivedQuests[0] = 0;
        if (!existingUser.receivedQuests[1]) existingUser.trackedQuests[1] = 0;
      }
    }

    await existingUser.save();

    delete existingUser.loginHistory;

    return successResponse({
      res,
      response: { data: existingUser },
    });
  } catch (err) {
    return errorResponse({ res, err });
  }
};
