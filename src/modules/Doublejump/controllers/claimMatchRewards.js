import { errorResponse, successResponse } from "../../../utils";
import UserModel from "../../User/model";
import DoublejumpModel from "../model";

export const claimMatchRewardsController = async (req, res) => {
  const matchId=req.body['match-id'];
  const playerSize=req.body['player-size'];
  const players=req.body['player-results'];
  

  try {
    const walletAddresses = players.map(player => player["wallet-address"]);
    const uniqueWalletAddresses = new Set(walletAddresses);

    if (walletAddresses.length !== uniqueWalletAddresses.size) {
        await DoublejumpModel.findOneAndUpdate({matchId},{players},{new: true});
    
        switch (playerSize) {
            case 20:
                for( const player of players){
                    let user = await UserModel.findOne({ wallet: player["wallet-address"] });
                    if(player['rank']===1){
                        user.totalBalance+=7;
                        await user.save()
                    }else if(player['rank']===2){
                        user.totalBalance+=3.80;
                        await user.save()
                    }else if(player['rank']===3){
                        user.totalBalance+=2.20;
                        await user.save()
                    }else if(player['rank']===4){
                        user.totalBalance+=1.50;
                        await user.save()
                    }else if(player['rank']===5){
                        user.totalBalance+=1.30;
                        await user.save()
                    }else if(player['rank']===6){
                        user.totalBalance+=1.00;
                        await user.save()
                    }else if(player['rank']===7){
                        user.totalBalance+=0.50;
                        await user.save()
                    }else if(player['rank']===8){
                        user.totalBalance+=0.30;
                        await user.save()
                    }else if(player['rank']===9){
                        user.totalBalance+=0.20;
                        await user.save()
                    }else if(player['rank']===10){
                        user.totalBalance+=0.20;
                        await user.save()
                    }else {
                        user.totalBalance+=0.10;
                        await user.save()
                    }
                }
                break;
            case 19:
                for( const player of players){
                    let user = await UserModel.findOne({ wallet: player["wallet-address"] });
                    if(player['rank']===1){
                        user.totalBalance+=6.90;
                        await user.save()
                    }else if(player['rank']===2){
                        user.totalBalance+=3.60;
                        await user.save()
                    }else if(player['rank']===3){
                        user.totalBalance+=2.10;
                        await user.save()
                    }else if(player['rank']===4){
                        user.totalBalance+=1.40;
                        await user.save()
                    }else if(player['rank']===5){
                        user.totalBalance+=1.20;
                        await user.save()
                    }else if(player['rank']===6){
                        user.totalBalance+=0.90;
                        await user.save()
                    }else if(player['rank']===7){
                        user.totalBalance+=0.45;
                        await user.save()
                    }else if(player['rank']===8){
                        user.totalBalance+=0.20;
                        await user.save()
                    }else if(player['rank']===9){
                        user.totalBalance+=0.20;
                        await user.save()
                    }else if(player['rank']===10){
                        user.totalBalance+=0.20;
                        await user.save()
                    }else {
                        user.totalBalance+=0.10;
                        await user.save()
                    }
                }
                break;
            case 18:
                for( const player of players){
                    let user = await UserModel.findOne({ wallet: player["wallet-address"] });
                    if(player['rank']===1){
                        user.totalBalance+=6.70;
                        await user.save()
                    }else if(player['rank']===2){
                        user.totalBalance+=3.40;
                        await user.save()
                    }else if(player['rank']===3){
                        user.totalBalance+=2.00;
                        await user.save()
                    }else if(player['rank']===4){
                        user.totalBalance+=1.30;
                        await user.save()
                    }else if(player['rank']===5){
                        user.totalBalance+=1.10;
                        await user.save()
                    }else if(player['rank']===6){
                        user.totalBalance+=0.80;
                        await user.save()
                    }else if(player['rank']===7){
                        user.totalBalance+=0.40;
                        await user.save()
                    }else if(player['rank']===8){
                        user.totalBalance+=0.20;
                        await user.save()
                    }else if(player['rank']===9){
                        user.totalBalance+=0.20;
                        await user.save()
                    }else if(player['rank']===10){
                        user.totalBalance+=0.20;
                        await user.save()
                    }else {
                        user.totalBalance+=0.10;
                        await user.save()
                    }
                }
                break;
            case 17:
                for( const player of players){
                    let user = await UserModel.findOne({ wallet: player["wallet-address"] });
                    if(player['rank']===1){
                        user.totalBalance+=6.40;
                        await user.save()
                    }else if(player['rank']===2){
                        user.totalBalance+=3.30;
                        await user.save()
                    }else if(player['rank']===3){
                        user.totalBalance+=1.90;
                        await user.save()
                    }else if(player['rank']===4){
                        user.totalBalance+=1.20;
                        await user.save()
                    }else if(player['rank']===5){
                        user.totalBalance+=1.00;
                        await user.save()
                    }else if(player['rank']===6){
                        user.totalBalance+=0.65;
                        await user.save()
                    }else if(player['rank']===7){
                        user.totalBalance+=0.40;
                        await user.save()
                    }else if(player['rank']===8){
                        user.totalBalance+=0.20;
                        await user.save()
                    }else if(player['rank']===9){
                        user.totalBalance+=0.20;
                        await user.save()
                    }else if(player['rank']===10){
                        user.totalBalance+=0.20;
                        await user.save()
                    }else {
                        user.totalBalance+=0.10;
                        await user.save()
                    }
                }
                break;
            case 16:
                for( const player of players){
                    let user = await UserModel.findOne({ wallet: player["wallet-address"] });
                    if(player['rank']===1){
                        user.totalBalance+=6.20;
                        await user.save()
                    }else if(player['rank']===2){
                        user.totalBalance+=3.10;
                        await user.save()
                    }else if(player['rank']===3){
                        user.totalBalance+=1.80;
                        await user.save()
                    }else if(player['rank']===4){
                        user.totalBalance+=1.20;
                        await user.save()
                    }else if(player['rank']===5){
                        user.totalBalance+=0.90;
                        await user.save()
                    }else if(player['rank']===6){
                        user.totalBalance+=0.50;
                        await user.save()
                    }else if(player['rank']===7){
                        user.totalBalance+=0.30;
                        await user.save()
                    }else if(player['rank']===8){
                        user.totalBalance+=0.20;
                        await user.save()
                    }else if(player['rank']===9){
                        user.totalBalance+=0.20;
                        await user.save()
                    }else if(player['rank']===10){
                        user.totalBalance+=0.20;
                        await user.save()
                    }else {
                        user.totalBalance+=0.10;
                        await user.save()
                    }
                }
                break;
            case 15:
                for( const player of players){
                    let user = await UserModel.findOne({ wallet: player["wallet-address"] });
                    if(player['rank']===1){
                        user.totalBalance+=6.00;
                        await user.save()
                    }else if(player['rank']===2){
                        user.totalBalance+=3.00;
                        await user.save()
                    }else if(player['rank']===3){
                        user.totalBalance+=1.70;
                        await user.save()
                    }else if(player['rank']===4){
                        user.totalBalance+=1.10;
                        await user.save()
                    }else if(player['rank']===5){
                        user.totalBalance+=0.85;
                        await user.save()
                    }else if(player['rank']===6){
                        user.totalBalance+=0.40;
                        await user.save()
                    }else if(player['rank']===7){
                        user.totalBalance+=0.20;
                        await user.save()
                    }else if(player['rank']===8){
                        user.totalBalance+=0.20;
                        await user.save()
                    }else if(player['rank']===9){
                        user.totalBalance+=0.20;
                        await user.save()
                    }else {
                        user.totalBalance+=0.10;
                        await user.save()
                    }
                }
                break;
            case 14:
                for( const player of players){
                    let user = await UserModel.findOne({ wallet: player["wallet-address"] });
                    if(player['rank']===1){
                        user.totalBalance+=5.60;
                        await user.save()
                    }else if(player['rank']===2){
                        user.totalBalance+=2.80;
                        await user.save()
                    }else if(player['rank']===3){
                        user.totalBalance+=1.60;
                        await user.save()
                    }else if(player['rank']===4){
                        user.totalBalance+=1.00;
                        await user.save()
                    }else if(player['rank']===5){
                        user.totalBalance+=0.80;
                        await user.save()
                    }else if(player['rank']===6){
                        user.totalBalance+=0.40;
                        await user.save()
                    }else if(player['rank']===7){
                        user.totalBalance+=0.20;
                        await user.save()
                    }else if(player['rank']===8){
                        user.totalBalance+=0.20;
                        await user.save()
                    }else if(player['rank']===9){
                        user.totalBalance+=0.20;
                        await user.save()
                    }else {
                        user.totalBalance+=0.10;
                        await user.save()
                    }
                }
                break;
            case 13:
                for( const player of players){
                    let user = await UserModel.findOne({ wallet: player["wallet-address"] });
                    if(player['rank']===1){
                        user.totalBalance+=5.20;
                        await user.save()
                    }else if(player['rank']===2){
                        user.totalBalance+=2.60;
                        await user.save()
                    }else if(player['rank']===3){
                        user.totalBalance+=1.40;
                        await user.save()
                    }else if(player['rank']===4){
                        user.totalBalance+=1.00;
                        await user.save()
                    }else if(player['rank']===5){
                        user.totalBalance+=0.75;
                        await user.save()
                    }else if(player['rank']===6){
                        user.totalBalance+=0.40;
                        await user.save()
                    }else if(player['rank']===7){
                        user.totalBalance+=0.20;
                        await user.save()
                    }else if(player['rank']===8){
                        user.totalBalance+=0.20;
                        await user.save()
                    }else if(player['rank']===9){
                        user.totalBalance+=0.20;
                        await user.save()
                    }else {
                        user.totalBalance+=0.10;
                        await user.save()
                    }
                }
                break;
            case 12:
                for( const player of players){
                    let user = await UserModel.findOne({ wallet: player["wallet-address"] });
                    if(player['rank']===1){
                        user.totalBalance+=4.80;
                        await user.save()
                    }else if(player['rank']===2){
                        user.totalBalance+=2.40;
                        await user.save()
                    }else if(player['rank']===3){
                        user.totalBalance+=1.30;
                        await user.save()
                    }else if(player['rank']===4){
                        user.totalBalance+=0.90;
                        await user.save()
                    }else if(player['rank']===5){
                        user.totalBalance+=0.70;
                        await user.save()
                    }else if(player['rank']===6){
                        user.totalBalance+=0.40;
                        await user.save()
                    }else if(player['rank']===7){
                        user.totalBalance+=0.20;
                        await user.save()
                    }else if(player['rank']===8){
                        user.totalBalance+=0.20;
                        await user.save()
                    }else if(player['rank']===9){
                        user.totalBalance+=0.20;
                        await user.save()
                    }else {
                        user.totalBalance+=0.10;
                        await user.save()
                    }
                }
                break;
            case 11:
                for( const player of players){
                    let user = await UserModel.findOne({ wallet: player["wallet-address"] });
                    if(player['rank']===1){
                        user.totalBalance+=4.40;
                        await user.save()
                    }else if(player['rank']===2){
                        user.totalBalance+=2.20;
                        await user.save()
                    }else if(player['rank']===3){
                        user.totalBalance+=1.20;
                        await user.save()
                    }else if(player['rank']===4){
                        user.totalBalance+=0.85;
                        await user.save()
                    }else if(player['rank']===5){
                        user.totalBalance+=0.60;
                        await user.save()
                    }else if(player['rank']===6){
                        user.totalBalance+=0.40;
                        await user.save()
                    }else if(player['rank']===7){
                        user.totalBalance+=0.20;
                        await user.save()
                    }else if(player['rank']===8){
                        user.totalBalance+=0.20;
                        await user.save()
                    }else if(player['rank']===9){
                        user.totalBalance+=0.20;
                        await user.save()
                    }else {
                        user.totalBalance+=0.10;
                        await user.save()
                    }
                }
                break;
            case 10:
                for( const player of players){
                    let user = await UserModel.findOne({ wallet: player["wallet-address"] });
                    if(player['rank']===1){
                        user.totalBalance+=4.00;
                        await user.save()
                    }else if(player['rank']===2){
                        user.totalBalance+=2.00;
                        await user.save()
                    }else if(player['rank']===3){
                        user.totalBalance+=1.00;
                        await user.save()
                    }else if(player['rank']===4){
                        user.totalBalance+=0.80;
                        await user.save()
                    }else if(player['rank']===5){
                        user.totalBalance+=0.60;
                        await user.save()
                    }else if(player['rank']===6){
                        user.totalBalance+=0.40;
                        await user.save()
                    }else if(player['rank']===7){
                        user.totalBalance+=0.20;
                        await user.save()
                    }else if(player['rank']===8){
                        user.totalBalance+=0.20;
                        await user.save()
                    }else if(player['rank']===9){
                        user.totalBalance+=0.20;
                        await user.save()
                    }else {
                        user.totalBalance+=0.10;
                        await user.save()
                    }
                }
                break;
            default:
                break;
        }
            
        return successResponse({ res, 'message': 'Successfully ended!' });
    } else {
        res.status(400).json({ message: 'All wallet addresses must be unique!' });
    }
    
    
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
