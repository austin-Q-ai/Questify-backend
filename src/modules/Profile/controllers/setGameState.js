import { successResponse, errorResponse } from "../../../utils";
import GameModel from "../../Game/model";
import UserModel from "../../User/model";

export const setGameStateController = async (req, res) => {
  try {
    const {
      body: { gameId, type },
      session: { userId },
    } = req;
    const profile = await req.profile();
    const { quests } = await GameModel.findById(gameId);
    var games = profile.games;
    var score = profile.score;
    var missionFlag = 0;
    if(!games) {
      return errorResponse({ res, err: "Something went wrong." });
    }

    const gameIndex = games.findIndex(s => s.game == gameId);

    if(gameIndex == -1) {
      if(type == true) {
        return errorResponse({ res, err: "Something went wrong." });
      }
      games.push({
        game: gameId,
        history: [
          {
            type: type
          }
        ]
      });
      missionFlag = 1;
      score += quests[0].score;
      quests[0].achievers.push({
        user: profile._id
      });
    } else {
      games[gameIndex].history.push({
        type: type,
      });
      if(type == true && games[gameIndex].history[games[gameIndex].history.length - 2].type == false) {
        const createdDate = new Date(games[gameIndex].history[games[gameIndex].history.length - 2].date);
        const endedDate = new Date();
        var hours = (Math.abs(endedDate.getTime() - createdDate.getTime()) / 3600000);
        games[gameIndex].hours += hours; 
        const userIndex = quests[1].achievers.findIndex(s => s.user == profile._id);
        if(userIndex == -1 && games[gameIndex].hours > 10) {
          score += quests[1].score;
          quests[1].achievers.push({
            user: profile._id
          });
          missionFlag = 2;
        }
      }
    }

    await GameModel.updateOne(
      { _id: gameId },
      {
        quests: quests
      }
    )

    await UserModel.updateOne(
      { _id: userId },
      {
        games: games,
        score: score,
      }
    );
    let userData = await req.profile();
    return successResponse({ res, response: { newProfile: userData, state: missionFlag } });
  } catch (err) {
    return errorResponse({ res, err });
  }
};
