import { errorResponse, successResponse } from "../../../utils";
import GameModel from "../model";

export const getGameController = async (req, res) => {
  try {
    const {
      body: { gameId },
    } = req;

    const game = await GameModel.findById(gameId);

    return successResponse({ res, response: { game } });
  } catch (err) {
    return errorResponse({ res, err });
  }
};
