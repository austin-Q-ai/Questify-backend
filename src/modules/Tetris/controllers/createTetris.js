import { errorResponse, successResponse } from "../../../utils";
import TetrisModel from "../model";
import UserModel from "../../User/model";

export const createTetrisController = async (req, res) => {
  const { wallet, txHash, amount, level } = req.body;
  console.log(wallet);

  try {
    const user = await UserModel.findOne({ wallet });

    if (user) {
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
