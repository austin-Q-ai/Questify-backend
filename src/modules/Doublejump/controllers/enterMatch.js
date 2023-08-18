import UserModel from "../../User/model";
import DoublejumpModel from "../model";


export const enterMatchController = async (req, res) => {
  const matchId=req.body['match-id'];
  const playerSize=req.body['player-size'];
  const originalPlayers=req.body['players'];

  let players = [];

  for (const result of originalPlayers) {
    const { email } = result;

    // Search UserModel by email to get the wallet-address
    const user = await UserModel.findOne({ email });

    if (user) {
      const { walletAddress } = user;

      // Create a new dictionary with wallet-address
      const player = {
        "wallet-address": walletAddress,
      };

      players.push(player);
    }
  }

  try {
    const existingMatch=await DoublejumpModel.findOne({matchId});
    if(existingMatch){
        res.status(400).json({ message: 'Match with same Id already existed!' });
    }
    for( const player of players){
        let user=await UserModel.findOne({ wallet: player["wallet-address"] });
        if(user.paidMatchState===0) res.status(400).json({ message: "Can't enter the match!" });
    }
    for( const player of players){
        let user=await UserModel.findOne({ wallet: player["wallet-address"] });
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
    res.status(200).json({ message: 'Successfully created a match!' });

  } catch (err) {
    res.status(400).json({ message: err });
  }
};
