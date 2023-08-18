import { errorResponse, successResponse } from "../../../utils";
import UserModel from "../model";
import TotalkeyModel from "../../Totalkey/model";

export const buyKeyController = async (req, res) => {
  const { wallet,keyID, buyAmount  } = req.body;
  console.log(wallet,keyID, buyAmount)
    if (!Number.isInteger(buyAmount) || buyAmount <= 0) {
        return errorResponse({ res, message:'The amount must be an integer and also be greater than zero!' });
    }
  try {
    const keyPrice=[1,2,5];
    let existingUser= await UserModel.findOne({wallet});
    let totalKeyInfo=await TotalkeyModel.findById('64de2e6fde6b0f7dcbbf2ece');
    if(!existingUser){
      return errorResponse({ res, message:'User with that wallet address don\'t exist' });
    }
    existingUser.totalBalance-=buyAmount*keyPrice[keyID];
    existingUser.rewardKey[keyID]+=buyAmount;
    if(totalKeyInfo.claimedKey[keyID]+buyAmount>totalKeyInfo.totalKey[keyID]) return errorResponse({ res, message:'Sorry, keys are all sold' });
    totalKeyInfo.claimedKey[keyID]+=buyAmount;
    await totalKeyInfo.save();
    await existingUser.save();

    return successResponse({ res, response: { user: existingUser, totalKeyInfo} });

  } catch (err) {
    return errorResponse({ res, err });
  }
  
};
