import { successResponse } from "../../../utils";
import UserModel from "../../User/model";

export const payMatchFeeController = async (req, res) => {
  const email = req.body['email'];
  const fee= req.body['fee'];

  try {
    let existingUser= await UserModel.findOne({email});
    if(fee===1){
      if(existingUser.paidMatchState===0){
        if(existingUser.totalBalance>=1){
          existingUser.totalBalance=existingUser.totalBalance-1;
          existingUser.paidMatchState=existingUser.paidMatchState+1;
          existingUser.paidMatches+=1;
          existingUser=await existingUser.save();
          return successResponse({ res, response: { status: "ok","wallet-balance": existingUser.totalBalance, "paid-matches": existingUser.paidMatches } });
        }
        else{
          res.status(400).json({ message: "Insufficient balance!" });
        }
      }else{
        return successResponse({ res, response: { status: "ok","wallet-balance": existingUser.totalBalance, "paid-matches": existingUser.paidMatches } });
      }
      
    }else{
      res.status(400).json({ message: 'Inappropriate fee!' });
    }
    

  } catch (err) {
    res.status(400).json({ message: err });
  }
};
