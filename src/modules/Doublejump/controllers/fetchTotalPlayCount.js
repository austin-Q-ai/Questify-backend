import { errorResponse, successResponse } from "../../../utils";
import TetrisModel from "../model";

export const fetchTotalPlayCountController = async (req, res) => {
  try {
    const totalPlayCount = await TetrisModel.find({}).count();
    return successResponse({
      res,
      response: { data: totalPlayCount },
    });
  } catch (err) {
    return errorResponse({ res, err });
  }
};
