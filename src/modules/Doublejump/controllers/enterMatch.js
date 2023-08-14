import { errorResponse, successResponse } from "../../../utils";
import UserModel from "../../User/model";
import DoublejumpModel from "../model";

async function checkPaidMatchState(walletAddress) {
    try {
        const user = await UserModel.findOne({ wallet: walletAddress });
        if (!user) {
            return false; // Error: User not found
        }

        if (user.paidMatchState === 0) {
            return false; // Error: paidMatchState is 0
        }

        return true; // paidMatchState is not 0
    } catch (error) {
        console.error('Error checking paidMatchState:', error);
        return false; // Error occurred while checking paidMatchState
    }
}

export const enterMatchController = async (req, res) => {
  const matchId=req.body['match-id'];
  const playerSize=req.body['player-size'];
  const players=req.body['players'];

  try {
    for( const player of players){
        let user=await UserModel.findOne({ wallet: player["wallet-address"] });
        if(user.paidMatchState===0) res.status(400).json({ message: "Can't enter the match!" });
        user.matchId=matchId;
        await user.save();
    }
    for( const player of players){
        await UserModel.findOneAndUpdate({ wallet: player["wallet-address"] }, {paidMatchState: 0}, {
            new: true
        });
    }

    let newMatch=new DoublejumpModel({
        matchId,playerSize,players
    })
    newMatch=await newMatch.save();
    return successResponse({ res, 'message': 'Successfully created a match!' });

  } catch (err) {
    res.status(400).json({ message: err });
  }
};
