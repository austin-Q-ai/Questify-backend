import { errorResponse, successResponse } from "../../../utils";
import UserModel from "../model";
import TotalkeyModel from "../../Totalkey/model";
import TetrisModel from "../../Tetris/model";

export const fetchLeaderBoardController = async (req, res) => {
  try {
    const showInfo = await UserModel.find(
      {},
      { wallet: 1, totalScore: 1, totalXP: 1, totalStar:1, rewardKey:1 }
    )
      .sort({ totalScore: -1 })
      .limit(5);
    const showXPInfo = await UserModel.find(
      {},
      { wallet: 1, totalScore: 1, totalXP: 1, totalStar:1 , rewardKey:1}
    )
      .sort({ totalXP: -1 })
      .limit(5);
    const totalKeyInfo=await TotalkeyModel.find(
      {},
      {totalKey:1, claimedKey:1, totalRewards:1, claimedRewards:1}
    ).limit(1);
    const tetrisInfo = await TetrisModel.find({})
      .sort({ updatedAt: -1 })
      .limit(15);
    return successResponse({
      res,
      response: { data: { showInfo, showXPInfo, tetrisInfo, totalKeyInfo } },
    });
  } catch (err) {
    return errorResponse({ res, err });
  }
};
