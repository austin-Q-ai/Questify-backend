import { RouteModule } from "../RouteModuleClass";
import {
  getGamesController,
  getGameController,
  getGameTweetsController,
} from "./controllers";
import { fetchGameSchema, gameIdSchema } from "./schema";

class GameModule extends RouteModule {
  publicRoutes() {
    this.router.get("/", getGamesController);

    this.router.post(
      "/game",
      this.validateSchema(fetchGameSchema),
      getGameController
    );

    this.router.get(
      "/:gameId/tweets",
      this.validateSchema(gameIdSchema),
      getGameTweetsController
    );
  }

  privateRoutes() {}
}

export const gameModule = new GameModule();
