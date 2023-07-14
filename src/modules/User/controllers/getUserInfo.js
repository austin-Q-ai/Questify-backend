import { errorResponse, successResponse } from "../../../utils";
import UserModel from "../model";

export const getUserInfoController = async (req, res) => {
  let { wallet } = req.body;
  try {
    let currentUser = await UserModel.findOne({ wallet });

    if (!currentUser) {
      currentUser = new UserModel({ wallet });
      await currentUser.save();
    }

    return successResponse({ res, response: { data: currentUser } });
  } catch (err) {
    return errorResponse({ res, err });
  }
};
