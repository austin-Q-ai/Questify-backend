import { errorResponse, successResponse } from "../../../utils";
import jwt from 'jsonwebtoken';
import UserModel from "../model";

export const createUserWithEmailController = async (req, res) => {
  const { email } = req.body;
  try {
    // Generate access token based on user's email
    const accessToken = jwt.sign({ email }, process.env.SESSION_SECRET);
    let existingUser= await UserModel.findOne({email});
    if(existingUser){
        await existingUser.updateOne({accessToken});
    }else{
        existingUser = new UserModel({ email, accessToken });
        await existingUser.save();
    }
    return successResponse({ res, response: { data: existingUser } });

  } catch (err) {
    return errorResponse({ res, err });
  }
  
};
