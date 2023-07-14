import { successResponse, errorResponse, throwError } from "../helpers";
import TxLogModel from "../modules/Token/model";

export const saveTxLog = async (req, res, next) => {
  console.log("👋 from saveTxLog!");
  try {
    const newTxLog = new TxLogModel({
      wallet: req.body.wallet,
      action: req.body.action,
      amount: req.body.amount,
      txHash: req.body.txHash,
      valid: req.body.valid,
    });

    newTxLog.save();
    return successResponse({ res, response: { existingUser: req.body.user } });
  } catch (err) {
    console.log(err);
    return errorResponse({ res, err: "Cannot Create Log!" });
  }
};
