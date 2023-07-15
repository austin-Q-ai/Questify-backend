import { errorResponse, successResponse } from "../../../utils";

export const findUserByIdController = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.zealy.io/communities/discord/leaderboard/"
    );
    return successResponse({
      res,
      response: { data: response.data },
    });
  } catch (err) {
    return errorResponse({ res, err });
  }
};
