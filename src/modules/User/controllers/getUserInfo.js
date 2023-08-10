import { errorResponse, successResponse } from "../../../utils";
import UserModel from "../model";

export const getUserInfoController = async (req, res) => {
  let { wallet, email } = req.body;
  try {
    let currentUser = await UserModel.findOne({ wallet });

    if (!currentUser) {
      currentUser = await UserModel.findOne({ email });
      await currentUser.updateOne({wallet});
    }

    return successResponse({ res, response: { data: currentUser } });
  } catch (err) {
    return errorResponse({ res, err });
  }
};
