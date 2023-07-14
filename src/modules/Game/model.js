import { Enum } from "@solana/web3.js";
import mongoose from "mongoose";
import { string } from "yup";

const Schema = mongoose.Schema;
const gameSchema = new Schema(
  {
    title: {
      type: String,
      index: true,
      unique: true,
      trim: true,
    },
    collectionName: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    totalSupply: {
      type: Number,
      required: true,
      default: 0,
    },
    memberNumber: {
      type: Number,
      required: true,
      default: 0,
    },
    bannerImage: {
      type: String,
      required: true,
      default: "",
    },
    itemImage: {
      type: String,
      required: false,
    },
    avatarImage: {
      type: String,
      required: true,
      default: "",
    },
    gameUrl: {
      type: String,
      required: true,
      default: "",
    },
    websiteUrl: {
      type: String,
      required: false,
    },
    twitterUrl: {
      type: String,
      required: false,
    },
    discordUrl: {
      type: String,
      required: false,
    },
    walletIcon: {
      type: String,
      required: true,
      default: "SolanaIcon",
    },
    galleryImages: [
      {
        type: String,
      },
    ],
    quests: [
      {
        name: { type: String, required: true, default: "" },
        detail: { type: String, required: true, default: "" },
        score: { type: Number, required: true, default: 0 },
        achievers: [
          {
            user: {
              type: Schema.Types.ObjectId,
              ref: "User",
            },
          },
        ],
      },
    ],
  },
  {
    autoIndex: true,
    timestamps: true,
    toJSON: { getters: true },
  }
);
const GameModel = mongoose.model("games", gameSchema);

export default GameModel;
