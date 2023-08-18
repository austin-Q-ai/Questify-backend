import UserModel from "../../User/model";
import DoublejumpModel from "../model";

export const enterMatchController = async (req, res) => {
  const matchId=req.body['match-id'];
  const playerSize=req.body['player-size'];
  const players=req.body['players'];

  try {
    const existingMatch=await DoublejumpModel.findOne({matchId});
    if(existingMatch){
        res.status(400).json({ message: 'Match with same Id already existed!' });
    }
    for( const player of players){
        let user=await UserModel.findOne({ email: player["email"] });
        if(user.paidMatchState===0) res.status(400).json({ message: "Can't enter the match!" });
    }
    for( const player of players){
        let user=await UserModel.findOne({ email: player["email"] });
        user.matchId=matchId;
        await user.save();
    }
    for( const player of players){
        await UserModel.findOneAndUpdate({ email: player["email"] }, {paidMatchState: 0}, {
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
