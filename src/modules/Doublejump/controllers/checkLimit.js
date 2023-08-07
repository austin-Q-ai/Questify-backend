import { errorResponse, successResponse } from "../../../utils";
import TetrisModel from "../model";

export const checkLimitController = async (req, res) => {
  const { wallet, level } = req.body;
  console.log(wallet, level);

  try {
    const todayTotal = await TetrisModel.find({ wallet, level }).count();
    if (todayTotal > 5) {
      return res.status(400).json({ message: "Rate limit" });
    }

    return successResponse({
      res,
      response: { status: "ok" },
    });
  } catch (err) {
    return errorResponse({ res, err });
  }
};
