import _ from "lodash";
import { errorResponse, successResponse } from "../../utils";
import UserModel from "../User/model";

export const updateArrayFieldController = async (req, res) => {
  try {
    await UserModel.updateMany(
      {},
      { $pop: { "achievedQuests.tetris": -1, "claimedQuests.tetris": -1 } }
    );
    return successResponse({ res, response: { success: true } });
  } catch (error) {
    console.log(error);
    return errorResponse({ err, response: { msg: err } });
  }
};

export const updateFieldsController = async (req, res) => {
  try {
    await UserModel.bulkWrite([
      {
        updateMany: {
          filter: {},
          update: {
            $unset: {
              lastScore: 1,
              txLog: 1,
              txHistory: 1,
              "tetris.history": 1,
              "tetris.hours": 1,
              "tetris.game": 1,
            },
          },
        },
      },
      {
        updateMany: {
          filter: {},
          update: {
            $rename: {
              trackedQuests: "achievedQuests.questify",
              receivedQuests: "claimedQuests.questify",
              "tetris.trackedQuests": "achievedQuests.tetris",
              "tetris.receivedQuests": "claimedQuests.tetris",
              "tetris.count": "playCount.tetris",
            },
          },
        },
      },
      {
        updateMany: {
          filter: {},
          update: {
            $unset: {
              tetris: 1,
            },
          },
        },
      },
    ]);

    return successResponse({ res, response: { success: true } });
  } catch (error) {
    console.log(error);
    return errorResponse({ err, response: { msg: err } });
  }
};

// try {
//   const user = await UserModel.findOne({
//     wallet: "sei1qu2vzlk4nj8vcu5zjczr4xmzdenu027fku4q4d",
//   });
//   user.totalPlay = 1;
//   user.save();

//   return successResponse({
//     res,
//     response: { data: user },
//   });
// } catch (err) {
//   return errorResponse({ err, response: { msg: "wrong!" } });
// }

// console.log(user);
// UserModel.create({ wallet: "testWallet" });
// const userCollection = UserModel.collection;

// // Check if the 'tetris' field exists before renaming it
// const hasTetrisField = await userCollection.findOne({
//   tetris: { $exists: true },
// });
// if (!hasTetrisField) {
//   throw new Error("The 'tetris' field does not exist in the document.");
// }

// const user = await UserModel.findOne({
//   wallet: "sei13wadwrs2awnk94l3uds46tsp0qmulayauthyuj",
// });
// await UserModel.find({}, async (err, users) => {
//   if (err) {
//     console.error(err);
//     return errorResponse({ res, err });
//   }
//   users.forEach(async (user) => {
//     console.log(user.wallet);
//     user.achievedQuests.tetris = user.tetris.trackedQuests;
//     user.claimedQuests.tetris = user.tetris.receivedQuests;
//     user.achievedQuests.questify = user.trackedQuests;
//     user.claimedQuests.questify = user.receivedQuests;
//     user.playCount.tetris = user.tetris.count;
//     delete user.tetris;
//     delete user.trackedQuests;
//     delete user.reaivedQuests;
//     await user.save();
//   });
//   await UserModel.updateMany(
//     {},
//     { $unset: { trackedQuests: 1, receivedQuests: 1, tetris: 1 } }
//   );
//   return successResponse({ res, response: { data: users } });
// });
// await UserModel.updateOne(
//   { wallet: "sei13wadwrs2awnk94l3uds46tsp0qmulayauthyuj" },
//   {
//     $rename: {
//       "tetris.trackedQuests": "achievedQuests.tetris",
//       "tetris.receivedQuests": "claimedQuests.tetris",
//       trackedQuests: "achievedQuests.questify",
//       receivedQuests: "claimedQuests.questify",
//     },
//   },
//   function (err, raw) {
//     if (err) {
//       console.log("Error updating documents:", err);
//       return errorResponse({ res, err });
//     } else {
//       console.log("Documents updated successfully!");
//       // Now you can remove the 'play.count' field
//       UserModel.updateOne(
//         { wallet: "sei13wadwrs2awnk94l3uds46tsp0qmulayauthyuj" },
//         { $unset: { trackedQuests: 1, receivedQuests: 1 } },
//         function (err, raw) {
//           if (err) {
//             console.log("Error removing field:", err);
//             return errorResponse({ res, err });
//           } else {
//             console.log("Field removed successfully!");
//             return successResponse({ res, response: { success: true } });
//           }
//         }
//       );
//     }
//   }
// );
// UserModel.updateMany(
//   { "receivedQuests.tetris": { $size: 4 } }, // Find UserModel with receivedQuests array length of 4
//   { $push: { "receivedQuests.tetris": { $each: [0, 0, 0, 0] } } }, // Append 4 zeros to the end of the receivedQuests array
//   { multi: true }, // Update multiple documents that match the query
//   (err, result) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(`${result.nModified} document(s) updated`);
//   }
// );
// return successResponse({ res, response: { data: user } });
