import { RouteModule } from "../RouteModuleClass";
import { getUserSchema, getUsersSchema, getEventsSchema } from "./schema";

import {
  fetchLeaderBoardController,
  compassUnlockController,
  getUserInfoController,
  levelUpController,
  claimQuestController,
  tempLoginController,
  claimedRewardsController,
  buyKeyController,
  walletConnectByDoubleController,
  compassKeyRewardsController,
  // getAllUsersController,
  // getUserWithWalletAddressController,
  // getUserFollowersController,
  // getLinkInfoController,
  // getRoomIdsController,
  // getUsersController,
  // followUserController,
  // unfollowUserController,
  // getFollowingStatusController,
  // getUserController,
  // getRoomInfoController,
  // getSelectedRoomInfoController,
  // getEventsController,
  // fetchUsersToInviteController,
  // fetchSuggestedFriendsController,
} from "./controllers";

class UserModule extends RouteModule {
  publicRoutes() {
    this.router.get("/fetchLeaderBoard", fetchLeaderBoardController);
    this.router.post("/compassUnlock", compassUnlockController);
    this.router.post("/getMyInfo", getUserInfoController);
    this.router.post("/claimQuest", claimQuestController);
    this.router.post("/levelUp", levelUpController);
    this.router.post("/tempLogin", tempLoginController);
    this.router.post("/claimedRewards", claimedRewardsController);
    this.router.post("/compassKeyRewards", compassKeyRewardsController);
    this.router.post("/buyKey", buyKeyController);
    this.router.post("/walletConnectByDouble", walletConnectByDoubleController);
    // // get all users on the system
    // this.router.get(
    //   "/",
    //   this.validateSchema(getUsersSchema, { includeQuery: true }),
    //   getUsersController
    // );

    // // get a user using the wallet address
    // this.router.get("/wallet/:address", getUserWithWalletAddressController);

    // // GOOD TO GO
    // this.router.get("/getLinkInfo/:link", getLinkInfoController);

    // // GOOD TO GO
    // this.router.get("/getRoomInfo/:name/:roomNo", getRoomInfoController);

    // // Get Selected live room info.
    // this.router.get(
    //   "/getSelectedRoomInfo/:roomNo",
    //   getSelectedRoomInfoController
    // );

    // // Get all the events info
    // this.router.get(
    //   "/getEvents",
    //   this.validateSchema(getEventsSchema, { includeQuery: true }),
    //   getEventsController
    // );

    // // REDUNDANT with the GET / endpoint. Confirm removal later
    // this.router.get("/getUsers", getAllUsersController);

    // // REDUNDANT with the GET / endpoint. Confirm removal later
    // this.router.get("/getRoomIds", getRoomIdsController);

    // // REDUNDANT with the GET /:id endpoint. Confirm removal later
    // // this.router.get("/getUserInfo/:name", getUserInfoController);

    // // get all the followers of a user
    // this.router.get(
    //   "/:username/followers",
    //   this.validateSchema(null, { idParamCheck: true, idName: "username" }),
    //   getUserFollowersController
    // );
    // // get a user by id
    // this.router.get(
    //   "/:id",
    //   this.validateSchema(getUserSchema, { includeQuery: true }),
    //   getUserController
    // );
  }

  // privateRoutes() {
  //   // get following status
  //   this.router.get(
  //     "/:username/follow",
  //     this.validateSchema(null, { idParamCheck: true, idName: "username" }),
  //     getFollowingStatusController
  //   );

  //   // Fetch Users to invite
  //   this.router.post("/fetchUsersToInvite", fetchUsersToInviteController);

  //   // Fetch Users to do chat
  //   this.router.post("/fetchSuggestedFriends", fetchSuggestedFriendsController);

  //   // follow a user
  //   this.router.post(
  //     "/:username/follow",
  //     this.validateSchema(null, { idParamCheck: true, idName: "username" }),
  //     followUserController
  //   );

  //   // unfollow a user
  //   this.router.post(
  //     "/:username/unfollow",
  //     this.validateSchema(null, { idParamCheck: true, idName: "username" }),
  //     unfollowUserController
  //   );
  // }
}

export const userModule = new UserModule();
