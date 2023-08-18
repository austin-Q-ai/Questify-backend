import { errorResponse, successResponse } from "../../../utils";
import UserModel from "../../User/model";

export const walletInfoController = async (req, res) => {
  const { email } = req.body;
  
  try {
    let existingUser= await UserModel.findOne({email});
    if(existingUser.wallet===""||existingUser.wallet==="template") res.status(400).json({ message: 'Please connect with your wallet!' });
    return successResponse({
      res,
      response: { status: "ok", "wallet-address": existingUser.wallet, "wallet-balance": existingUser.totalBalance, "paid-matches": existingUser.paidMatches },
    });
  } catch (err) {
    return errorResponse({ res, err });
  }
};
