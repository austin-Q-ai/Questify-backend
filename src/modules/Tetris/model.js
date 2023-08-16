import mongoose from "mongoose";

const Schema = mongoose.Schema;
const TetrisSchema = new Schema(
  {
    wallet: {
      type: mongoose.Schema.Types.String,
      ref: "users",
    },
    txHash: {
      type: String,
      default: 0,
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
      min:0,
    },
    goal: {
      type: Number,
      default: 0,
      min:0,
    },
    score: {
      type: Number,
      default: 0,
      min:0,
    },
    level: {
      type: Number,
      default: 1,
      min: 0,
      max: 10,
    },
  },
  {
    autoIndex: true,
    timestamps: true,
    toJSON: { getters: true },
  }
);
const TetrisModel = mongoose.model("tetrises", TetrisSchema);

export default TetrisModel;
