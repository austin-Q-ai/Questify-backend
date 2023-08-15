import { errorResponse, successResponse } from "../../../utils";
import UserModel from "./../../User/model";

const { DirectSecp256k1HdWallet } = require("@cosmjs/proto-signing");
const { calculateFee } = require("@cosmjs/stargate");
const { getSigningCosmWasmClient } = require("@sei-js/core");

export const withdrawController = async (req, res, next) => {
  const { wallet, amount } = req.body;
  const existingUser = await UserModel.findOne({ wallet });

  if (!existingUser) {
    console.log("Unable to find user for this wallet!");
    return errorResponse({ res, err: "Unable to find user for this wallet!" });
  }

  if (existingUser.totalBalance < amount) {
    console.log("You don't have enough balance!");
    return errorResponse({ res, err: "You don't have enough balance!" });
  }

  try {
    const to_wallet = await DirectSecp256k1HdWallet.fromMnemonic(
      process.env.ADMINWALLET,
      { prefix: "sei" }
    );
    const [firstAccount] = await to_wallet.getAccounts();

    const client = await getSigningCosmWasmClient(
      "https://rpc.atlantic-2.seinetwork.io/",
      to_wallet
    );

    const transferAmount = {
      amount: Math.floor(amount * 1e6).toString(),
      denom: "usei",
    };
    const fee = calculateFee(1500000, "0.1usei");

    const result = await client.sendTokens(
      firstAccount.address,
      wallet,
      [transferAmount],
      fee
    );

    req.body.txHash = result.transactionHash;
    req.body.action = false;
    req.body.valid = true;

    existingUser.totalBalance =
      Math.floor((existingUser.totalBalance - amount) * 1000) / 1000;
    await existingUser.save();

    delete existingUser.loginHistory;

    next();
  } catch (err) {
    console.log(err);
    return errorResponse({ res, err: "Error in RPC Endpoint!" });
  }
};
