import mongoose from "mongoose";

const Schema = mongoose.Schema;
const DoublejumpSchema = new Schema(
  {
    players: [
      {
        wallet: {
          type: mongoose.Schema.Types.String,
          ref: "users",
        },
        rank: {
          type: Number,
          required: true,
          default: 0,
        },
        points: {
          type: Number,
          required: true,
          default: 0,
        }
      }
    ],
    matchId:{
      type: String, unique: true, required: true
    },
    playerSize: {
      type: Number,
      required: true,
      default: 0,
    },
    
  },
  {
    autoIndex: true,
    timestamps: true,
    toJSON: { getters: true },
  }
);
const DoublejumpModel = mongoose.model("doublejump", DoublejumpSchema);

export default DoublejumpModel;
