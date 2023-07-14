import mongoose from "mongoose";

const Schema = mongoose.Schema;
const txLogSchema = new Schema(
  {
    wallet: {
      type: mongoose.Schema.Types.String,
      ref: "users",
    },
    action: {
      type: Boolean,
      default: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
    txHash: {
      type: String,
      default: 0,
    },
    valid: {
      type: Boolean,
      default: true,
    },
  },
  {
    autoIndex: true,
    timestamps: true,
    toJSON: { getters: true },
  }
);
const TxLogModel = mongoose.model("txLogs", txLogSchema);

export default TxLogModel;
