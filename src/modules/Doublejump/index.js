import { RouteModule } from "../RouteModuleClass";
// import { getUserSchema, getUsersSchema, getEventsSchema } from "./schema";
import UserModel from "../User/model";
import jwt from 'jsonwebtoken';

import {
  loginWithEmailController,
  walletInfoController,
  loginController,
  payMatchFeeController,
  enterMatchController,
  claimMatchRewardsController,
  linkEmailController
} from "./controllers";

const validateEmail=(email)=> {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Middleware function to check headers
const checkHeaders=(req, res, next)=> {
  const XAPIKEY = req.headers['x-api-key'];
  const XPROJECTKEY = req.headers['x-project-key'];

  // Check if X-API-KEY and X-PROJECT-KEY match process.env.DOUBLEJUMP
  if (XAPIKEY === process.env.BLANKLABS && XPROJECTKEY === process.env.DOUBLEJUMP) {
    // Proceed to the next middleware/controller
    next();
  } else {
    // Return an error message
    res.status(400).json({ message: 'API key or Project key is invalid!' });
  }
}

const checkAccessToken=async (req, res, next)=> {
  const accessToken = req.headers['x-access-token'];

  const email=req.body['email'];
  const wallet=req.body['wallet-address'];
  const isValidEmail = validateEmail(email);
  if(isValidEmail){
    const existingUser=await UserModel.findOne({email});
    if(!existingUser) res.status(400).json({ message: 'Cannot find the user with that email!' });
    if(existingUser.accessToken===accessToken){
      next();
    } else{
      res.status(400).json({ message: 'Access token is invalid!' });
    }
  }else if(wallet&&wallet!==""&&wallet!=="template"){
    const existingUser=await UserModel.findOne({wallet});
    if(!existingUser) res.status(400).json({ message: 'Cannot find the user with that wallet address!' });
    if(existingUser.accessToken===accessToken){
      next();
    } else{
      res.status(400).json({ message: 'Access token is invalid!' });
    }
  }else{
    res.status(400).json({ message: 'Please provide exact email or wallet address!' });
  }
    
}

const checkWalletAccessToken=async (req, res, next)=> {
  const accessToken = req.headers['x-access-token'];
  const email=req.body['email'];
  try{
    const isValidEmail = validateEmail(email);
    if(isValidEmail){
      const decodedToken = jwt.verify(accessToken, process.env.SESSION_SECRET);
      const existingUser=await UserModel.findOne({accessToken});
      if(!existingUser) res.status(400).json({ message: 'Cannot find the user with that access token!' });
      req.body.wallet=decodedToken.wallet;
      next();
    }else{
      res.status(400).json({ message: 'Please provide exact email address!' });
    }
  }catch(err){
    res.status(400).json({ message: err });
  }
  
    
}

class DoublejumpModule extends RouteModule {
  publicRoutes() {
    this.router.get("/login", loginController);
    this.router.post("/v1/loginWithEmail", checkHeaders, loginWithEmailController);
    this.router.post("/v1/userInfo", checkHeaders, checkAccessToken, walletInfoController);
    this.router.post("/v1/payMatchFee", checkHeaders, checkAccessToken, payMatchFeeController);
    this.router.post("/v1/enterMatch", checkHeaders, enterMatchController);
    this.router.post("/v1/claimMatchRewards", checkHeaders, claimMatchRewardsController);
    this.router.post("/v1/linkEmail", checkHeaders, checkWalletAccessToken, linkEmailController);


    // get all users on the system
    // this.router.get(
    //   "/",
    //   this.validateSchema(getUsersSchema, { includeQuery: true }),
    //   getUsersController
    // );
  }

  privateRoutes() {
    // // get following status
    // this.router.get(
    //   "/:username/follow",
    //   this.validateSchema(null, { idParamCheck: true, idName: "username" }),
    //   getFollowingStatusController
    // );
  }
}

export const doublejumpModule = new DoublejumpModule();
