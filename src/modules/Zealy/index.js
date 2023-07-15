import { RouteModule } from "../RouteModuleClass";

import {
  fetchClaimedQuestsController,
  fetchCurrentSprintController,
  fetchLeaderBoardController,
  findUserByIdController,
  findUsersController,
  giveXPController,
  removeXPController,
  reviewClaimedQuestsController,
} from "./controllers";

class ZealyModule extends RouteModule {
  publicRoutes() {
    this.router.get("/fetchClaimedQuests", fetchClaimedQuestsController);
    this.router.get("/fetchCurrentSprint", fetchCurrentSprintController);
    this.router.get("/fetchLeaderBoard", fetchLeaderBoardController);
    this.router.get("/findUserById", findUserByIdController);
    this.router.get("/findUsers", findUsersController);
    this.router.get("/giveXP", giveXPController);
    this.router.get("/removeXP", removeXPController);
    this.router.get("/reviewClaimedQuests", reviewClaimedQuestsController);
  }

  privateRoutes() {}
}

export const zealyModule = new ZealyModule();
