import { errorResponse, successResponse } from "../../../utils";
import TetrisModel from "../model";
import UserModel from "../../User/model";
      

export const createTetrisController = async (req, res) => {
  const { wallet, txHash, amount, level } = req.body;
  console.log(wallet);
  if(amount<0){
    return errorResponse({ res, err: "Hacking Attempt Occured!" });
  }
  try {
    const user = await UserModel.findOne({ wallet });

    if (user) {
      user.achievedQuests.tetris[0]=1;
      const today = new Date().setHours(0, 0, 0, 0);
      const lastTetrisDate = user.lastTetrisDate;
      
      if (lastTetrisDate) {
        
        if (today - lastTetrisDate === 24 * 60 * 60 * 1000) {
          user.achievedQuests.tetris[1] += 1;
        } else if (today - lastTetrisDate > 24 * 60 * 60 * 1000) {
          // User missed a day, reset the streak count
          user.achievedQuests.tetris[1] = 1;
        }
        // User has activity on consecutive days, no action needed
      } else {
        // First activity, set the streak count to 1
        user.achievedQuests.tetris[1]=1;
      }
      
      user.lastTetrisDate = today;

      await user.save();
      console.log(`Updated user with wallet ${wallet}`);
      
      if (user.totalBalance < amount) {
        return errorResponse({ res, err: "Can't create game" });
      }
    } else {
      return errorResponse({ res, err: "Can't create game" });
    }

    let goal;

    if (level === 1) {
      goal = Math.floor(Math.random() * 1000) + 14000;
    }
    if (level === 2) {
      goal = Math.floor(Math.random() * 3000) + 28000;
    }
    if (level === 3) {
      goal = Math.floor(Math.random() * 5000) + 45000;
    }

    const newTetris = await TetrisModel.create({
      wallet,
      txHash,
      amount,
      score: 0,
      goal,
      level,
    });

    user.totalBalance = Math.floor((user.totalBalance - amount) * 1000) / 1000;
    await user.save();

    return successResponse({
      res,
      response: { newTetris },
    });
  } catch (err) {
    return errorResponse({ res, err });
  }
};
