import { RouteModule } from "../RouteModuleClass";
// import { getUserSchema, getUsersSchema, getEventsSchema } from "./schema";
import UserModel from "../User/model";

import {
  registerController,
} from "./controllers";


class SignModule extends RouteModule {
  publicRoutes() {
    this.router.post("/register", registerController);

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

export const signModule = new SignModule();
