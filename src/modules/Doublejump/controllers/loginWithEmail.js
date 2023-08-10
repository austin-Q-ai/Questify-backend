import { successResponse } from "../../../utils";
import jwt from 'jsonwebtoken';
import UserModel from "../../User/model";

const validateEmail=(email)=> {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const loginWithEmailController = async (req, res) => {
  const { email } = req.body;
  
  const isValidEmail = validateEmail(email);
  if (isValidEmail) {
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
      return successResponse({
        res,
        response: { status: "ok", "access-token": accessToken },
      });
  
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  } else {
    res.status(400).json({ message: 'The email is invalid.' });
  }
  
};
