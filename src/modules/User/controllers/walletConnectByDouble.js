import { errorResponse, successResponse } from "../../../utils";
import jwt from 'jsonwebtoken';
import UserModel from "../model";

export const walletConnectByDoubleController = async (req, res) => {
  const { wallet, accessTokenByEmail } = req.body;
  if(!accessTokenByEmail) return successResponse({ res, response: { } });
  try {
    const decodedToken = jwt.verify(accessTokenByEmail, process.env.SESSION_SECRET);
    if(!decodedToken.email) res.status(400).json({ message: 'Access token by email address is invalid!' });
    let existingUser=await UserModel.findOne({email: decodedToken.email})
    if(!existingUser) res.status(400).json({ message: 'Cannot find the user with that access token!' });
    if(existingUser.wallet&&existingUser.wallet!==""&&existingUser.wallet!=="template") return successResponse({ res, response: { } });
    
    let existingUserByWallet= await UserModel.findOne({wallet});
    if(existingUserByWallet){
        await UserModel.findOneAndDelete({email: decodedToken.email})
        existingUserByWallet.email=decodedToken.email;
        existingUserByWallet.accessToken=accessTokenByEmail;
        await existingUserByWallet.save();
        res.status(200).json({ user: existingUserByWallet });
    }else{
        existingUser.wallet=wallet;
        await existingUser.save();
        res.status(200).json({ user: existingUser });
    }

  } catch (err) {
    res.status(500).json({ err });
  }
  
};
