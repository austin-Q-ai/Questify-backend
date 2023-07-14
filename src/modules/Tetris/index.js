import { RouteModule } from "../RouteModuleClass";
// import { getUserSchema, getUsersSchema, getEventsSchema } from "./schema";

import {
  createTetrisController,
  fetchQuestStateController,
  claimChestController,
  checkLimitController,
  fetchTotalPlayCountController,
  claimQuestController,
} from "./controllers";

class TetrisModule extends RouteModule {
  publicRoutes() {
    this.router.get("/fetchTotalUser", fetchTotalPlayCountController);
    this.router.post("/claimChest", claimChestController);
    this.router.post("/createTetris", createTetrisController);
    this.router.post("/checkLimit", checkLimitController);
    this.router.post("/claimQuest", claimQuestController);

    // get all users on the system
    // this.router.get(
    //   "/",
    //   this.validateSchema(getUsersSchema, { includeQuery: true }),
    //   getUsersController
    // );
  }

  privateRoutes() {
    // // get following status
    // this.router.get(
    //   "/:username/follow",
    //   this.validateSchema(null, { idParamCheck: true, idName: "username" }),
    //   getFollowingStatusController
    // );
  }
}

export const tetrisModule = new TetrisModule();
