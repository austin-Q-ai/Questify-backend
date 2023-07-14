import { rest } from "lodash";
import {
  successResponse,
  throwError,
  errorResponse,
  getTwitterApi,
} from "../../../helpers";
import GameModel from "../model";

export const getGameTweetsController = async (req, res) => {
  try {
    const { gameId } = req.params;

    const game = await GameModel.findById(gameId);
    if (!game) throwError("No game available with the provided ID");

    let tweets = [];

    if (game.twitterUrl) {
      let handle = game.twitterUrl.split("/");
      handle = handle[handle.length - 1];
      const twitterApi = getTwitterApi();

      tweets = await twitterApi.v1.userTimelineByUsername(handle);

      tweets = tweets._realData;

      tweets = tweets.map(
        ({
          created_at: createdAt,
          id,
          full_text: fullText,
          user,
          user: {
            url: userUrl,
            profile_image_url: profileImageUrl,
            name: userName,
            screen_name: handle,
          },
        }) => ({
          userName,
          handle,
          id,
          createdAt,
          fullText,
          userUrl,
          profileImageUrl,
        })
      );
    }

    return successResponse({ res, response: { data: tweets } });
  } catch (err) {
    console.log(err);
    return errorResponse({ res, err });
  }
};
