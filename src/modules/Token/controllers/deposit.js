import { errorResponse, successResponse } from "../../../utils";
import UserModel from "./../../User/model";
import TxLogModel from "../model";

const { getQueryClient } = require("@sei-js/core");

export const depositController = async (req, res, next) => {
  const { wallet, txHash } = req.body;

  const to_address = "sei10cs7ddu93ge6kwfllm24cm20h4j4vx00sfaqh7";

  try {
    const existingTxLog = await TxLogModel.findOne({ txHash });

    if (existingTxLog) {
      console.log("Transaction hash already exists in txLog!");
      return errorResponse({ res, err: "Double spending error!" });
    }

    const queryClient = await getQueryClient("https://rest.sei-apis.com/");
    const result = await queryClient.cosmos.tx.v1beta1.getTx({ hash: txHash });

    const tx_log = result.tx_response.raw_log;
    const type = result.tx.body.messages[0]["@type"];
    const from = result.tx.body.messages[0].from_address;
    const to = result.tx.body.messages[0].to_address;
    const amount = result.tx.body.messages[0].amount[0].amount;

    req.body.amount = Number(amount) / 1e6;
    req.body.action = true;

    if (tx_log.startsWith("failed to execute message;")) {
      console.log("Failed Transaction Hash!");
      req.body.valid = false;
      next();
    }

    if (
      type != "/cosmos.bank.v1beta1.MsgSend" ||
      from !== wallet ||
      to !== to_address
    ) {
      console.log("TX🧨ATTACK: ", from, to, type);
      req.body.valid = false;
      next();
    }

    const existingUser = await UserModel.findOne({ wallet });

    if (existingUser) {
      existingUser.totalBalance =
        Math.floor((existingUser.totalBalance + req.body.amount) * 1000) / 1000;
      existingUser.achievedQuests.questify[2] = 1;

      if (existingUser.achievedQuests.questify[3] < 5)
        existingUser.achievedQuests.questify[3] += 1;

      await existingUser.save();

      req.body.valid = true;
      req.body.user = existingUser;
      console.log("Valid Transaction Hash!");
      next();
    } else {
      console.log("Unable to find user for this wallet!");
      return errorResponse({
        res,
        err: "Unable to find user for this wallet!",
      });
    }
  } catch (err) {
    console.log("TX🧨CHECK ERROR: ", err.response.data);
    req.body.valid = false;
    next();
  }
};
