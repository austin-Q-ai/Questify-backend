import UserModel from "../../User/model";
import DoublejumpModel from "../model";


const findDuplicateWallets = (playerResults) => {
    const walletMap = new Map();
    const duplicateWallets = [];
  
    for (const result of playerResults) {
      const walletAddress = result["wallet-address"];
      
      if (walletMap.has(walletAddress)) {
        if (!duplicateWallets.includes(walletAddress)) {
          duplicateWallets.push(walletAddress);
        }
      } else {
        walletMap.set(walletAddress, true);
      }
    }
  
    return duplicateWallets;
};
  
export const claimMatchRewardsController = async (req, res) => {
  const matchId=req.body['match-id'];
  const playerResults=req.body['player-results'];
  

  try {

        // await DoublejumpModel.findOneAndUpdate({matchId},{players},{new: true});
        let {players, playerSize}= await DoublejumpModel.findOne({matchId});
        let matchResult=[];
        
        // Extract wallet addresses from both arrays
        const firstAddresses = players.map(player => player["wallet"]);
        const secondAddresses = playerResults.map(player => player["wallet-address"]);
        
        // Find missing wallet addresses
        const missingAddresses = firstAddresses.filter(address => !secondAddresses.includes(address));
        console.log(missingAddresses)
        for( const address of missingAddresses){
            if(address) matchResult.push({'wallet-address': address, 'rewarded': false, 'error-code': 3});
            
        }
        console.log(matchResult)
        
        const overlappingWallets = findDuplicateWallets(playerResults);
        for( const address of overlappingWallets){
            if(address) matchResult.push({'wallet-address': address, 'rewarded': false, 'error-code': 2});
        }
        
        for( const player of playerResults){
            const user= await UserModel.findOne({wallet: player["wallet-address"]});
            if(user['matchId']!==matchId){
                matchResult.push({'wallet-address': player["wallet-address"], 'rewarded': false, 'error-code': 1});
            }
        }

        switch (playerSize) {
            case 20:
                for( const player of playerResults){
                    const isWalletAddressIncluded = matchResult.some(obj => obj['wallet-address'] === player["wallet-address"]);
                    if (!isWalletAddressIncluded) {
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
                }
                break;
            case 19:
                for( const player of playerResults){
                    const isWalletAddressIncluded = matchResult.some(obj => obj['wallet-address'] === player["wallet-address"]);
                    if (!isWalletAddressIncluded) {
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
                    
                }
                break;
            case 18:
                for( const player of playerResults){
                    const isWalletAddressIncluded = matchResult.some(obj => obj['wallet-address'] === player["wallet-address"]);
                    if (!isWalletAddressIncluded) {
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
                    
                }
                break;
            case 17:
                for( const player of playerResults){
                    const isWalletAddressIncluded = matchResult.some(obj => obj['wallet-address'] === player["wallet-address"]);
                    if (!isWalletAddressIncluded) {
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
                    
                }
                break;
            case 16:
                for( const player of playerResults){
                    const isWalletAddressIncluded = matchResult.some(obj => obj['wallet-address'] === player["wallet-address"]);
                    if (!isWalletAddressIncluded) {
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
                    
                }
                break;
            case 15:
                for( const player of playerResults){
                    const isWalletAddressIncluded = matchResult.some(obj => obj['wallet-address'] === player["wallet-address"]);
                    if (!isWalletAddressIncluded) {
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
                    
                }
                break;
            case 14:
                for( const player of playerResults){
                    const isWalletAddressIncluded = matchResult.some(obj => obj['wallet-address'] === player["wallet-address"]);
                    if (!isWalletAddressIncluded) {
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
                    
                }
                break;
            case 13:
                for( const player of playerResults){
                    const isWalletAddressIncluded = matchResult.some(obj => obj['wallet-address'] === player["wallet-address"]);
                    if (!isWalletAddressIncluded) {
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
                    
                }
                break;
            case 12:
                for( const player of playerResults){
                    const isWalletAddressIncluded = matchResult.some(obj => obj['wallet-address'] === player["wallet-address"]);
                    if (!isWalletAddressIncluded) {
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
                    
                }
                break;
            case 11:
                for( const player of playerResults){
                    const isWalletAddressIncluded = matchResult.some(obj => obj['wallet-address'] === player["wallet-address"]);
                    if (!isWalletAddressIncluded) {
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
                    
                }
                break;
            case 10:
                for( const player of playerResults){
                    const isWalletAddressIncluded = matchResult.some(obj => obj['wallet-address'] === player["wallet-address"]);
                    if (!isWalletAddressIncluded) {
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
                    
                }
                break;
            default:
                break;
        }
        res.status(200).json({ matchResult });
    
    
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
