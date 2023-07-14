import { errorResponse, successResponse } from "../../../utils";
import GameModel from "../model";

export const getGamesController = async (req, res) => {
  try {

    const games = await GameModel.find();

    return successResponse({ res, response: { games } });
  } catch (err) {
    return errorResponse({ res, err });
  }
};
