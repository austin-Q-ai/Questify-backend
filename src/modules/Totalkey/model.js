import mongoose from "mongoose";

const Schema = mongoose.Schema;
const TotalkeySchema = new Schema(
  {
    totalKey: { type: Array, required: true, default: [0, 0, 0] },
    claimedKey: { type: Array, required: true, default: [0, 0, 0] },
    totalRewards:{ type: Array, required: true, default: [0, 0, 0, 0,0 ,0,0,0,0,0,0,0,0,0,0,0] },
    claimedRewards: { type: Array, required: true, default: [0, 0, 0, 0,0 ,0,0,0,0,0,0,0,0,0,0,0] },
  },
  {
    autoIndex: true,
    timestamps: true,
    toJSON: { getters: true },
  }
);
const TotalkeyModel = mongoose.model("totalkey", TotalkeySchema);

export default TotalkeyModel;
