import { errorResponse, successResponse } from "../../../utils";
import jwt from 'jsonwebtoken';
import DoublejumpModel from "../model";
import UserModel from "../../User/model";

export const loginController = async (req, res) => {
  const accessToken = req.query['access-token'];
  
  try {
    
    let existingUser= await UserModel.findOne({accessToken});
    if(existingUser){
      return successResponse({ res, response: { data: existingUser } });
    }else{
      return errorResponse({ res, 
        response: { status: "fail", "message": "Can't find the user with than access token!"}, });
    }

  } catch (err) {
    return errorResponse({ res, err });
  }
};
