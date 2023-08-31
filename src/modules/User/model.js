import mongoose from "mongoose";
import { boolean } from "yup";

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    wallet: { type: String, key: true, default: "" },
    email: {
      unique: true,
      type: String,
      trim: true,
      lowercase: true,
      // validate: {
      //     validator: function(value) {
      //         // Add your validation logic here
      //         // You can use regular expressions or any other method to validate the email
      //         // For example, using a regular expression to validate email format
      //         return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
      //     },
      //     message: 'Invalid email format'
      // }
    },
    password: {
      type: String,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    matchId: { type: String, default: "" },
    gamerId: { type: String, default: "" },
    totalBalance: { type: Number, required: true, default: 0 },
    totalScore: { type: Number, required: true, default: 0 },
    totalPlay: { type: Number, required: true, default: 0 },
    totalXP: { type: Number, required: true, default: 0 },
    totalStar: { type: Number, required: true, default: 0 },
    claimedRewards: {
      type: Array,
      required: true,
      default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    compass: {
      type: Boolean,
      required: true,
      default: false,
    },
    level: { type: Number, required: true, default: 1 },
    achievedQuests: {
      questify: { type: Array, required: true, default: [0, 0, 0, 0] },
      doublejump: { type: Array, required: true, default: [0, 0, 0, 0] },
      lootbox: { type: Array, required: true, default: [0, 0, 0] },
      community: { type: Array, required: true, default: [0, 0, 0, 0] },
      tetris: {
        type: Array,
        required: true,
        default: [0, 0, 0, 0, 0, 0, 0],
      },
    },
    claimedQuests: {
      questify: { type: Array, required: true, default: [0, 0, 0, 0] },
      doublejump: { type: Array, required: true, default: [0, 0, 0, 0] },
      lootbox: { type: Array, required: true, default: [0, 0, 0] },
      community: { type: Array, required: true, default: [0, 0, 0, 0] },
      tetris: {
        type: Array,
        required: true,
        default: [0, 0, 0, 0, 0, 0, 0],
      },
    },
    playCount: {
      tetris: { type: Number, required: true, default: 0 },
    },
    rewardKey: {
      type: Array,
      required: true,
      default: [0, 0, 0],
    },
    lastActivityDate: Date,
    lastTetrisDate: Date,
    accessToken: { type: String, default: "" },
    paidMatchState: { type: Number, required: true, default: 0 },
    paidMatches: { type: Number, required: true, default: 0 },

    // lastScore: { type: Number, require: true, default: 0 },
    // tetris: {
    //   game: {
    //     type: String,
    //     default: "Game",
    //   },
    //   hours: { type: Number, default: 0 },
    //   history: [
    //     {
    //       time: { type: Date, default: Date.now },
    //       result: { type: Boolean, default: false },
    //       level: { type: Number, default: 1 },
    //       logCode: { type: String, default: "" },
    //     },
    //   ],
    //   count: { type: Number, default: 0 },
    //   trackedQuests: {
    //     type: Array,
    //     default: [0, 0, 0, 0, 0, 0, 0, 0],
    //   },
    //   receivedQuests: {
    //     type: Array,
    //     default: [0, 0, 0, 0, 0, 0, 0, 0],
    //   },
    // },
    // txHistory: [
    //   {
    //     action: { type: Boolean, default: true }, // It's a type for depositing and withdrawing of token. true: Deposit, false: Withdraw.
    //     amount: { type: Number, default: 0 },
    //     txHash: { type: String, default: 0 },
    //     checked: { type: Boolean, default: false },
    //   },
    // ],
    // txLog: [
    //   {
    //     action: { type: Boolean, default: true }, // It's a type for depositing and withdrawing of token. true: Deposit, false: Withdraw.
    //     amount: { type: Number, default: 0 },
    //     txHash: { type: String, default: 0 },
    //     checked: { type: Boolean, default: false },
    //   },
    // ],
    // trackedQuests: { type: Array, default: [0, 0, 0, 0] },
    // receivedQuests: { type: Array, default: [0, 0, 0, 0] },

    // username: {
    //   type: String,
    //   index: true,
    //   unique: true,
    //   lowercase: true,
    //   sparse: true,
    //   trim: true,
    //   default: "untitled"
    // },
    // solanaAddress: {
    //   type: String,
    //   trim: true,
    //   index: {
    //     unique: true,
    //     partialFilterExpression: { solanaAddress: { $type: "string" } },
    //   },
    // },
    // ethereumAddress: {
    //   type: String,
    //   trim: true,
    //   index: {
    //     unique: true,
    //     partialFilterExpression: { ethereumAddress: { $type: "string" } },
    //   },
    // },
    // bio: { type: String, required: false, trim: true },
    // externalLinks: {
    //   twitter: {
    //     id: String,
    //     username: String,
    //     accessToken: String,
    //     refreshToken: String,
    //     connected: {
    //       type: Boolean,
    //       default: false,
    //     },
    //   },
    //   github: {
    //     username: String,
    //     connected: {
    //       type: Boolean,
    //       default: false,
    //     },
    //     accessToken: String,
    //     refreshToken: String,
    //   },
    //   discord: {
    //     username: String,
    //     accessToken: String,
    //     refreshToken: String,
    //     connected: {
    //       type: Boolean,
    //       default: false,
    //     },
    //   },
    // },
    // profileImage: {
    //   link: { type: String, required: false, trim: true },
    //   network: { type: String, required: false, trim: true },
    //   contractAddress: { type: String, required: false, trim: true },
    //   tokenId: { type: String, required: false, trim: true },
    //   mintAddress: { type: String, required: false, trim: true },
    // },
    // friends: [
    //   {
    //     friend: {
    //       type: Schema.Types.ObjectId,
    //       ref: "User",
    //     },
    //     status: { type: Number, default: 0 },
    //     roomRequests: [
    //       {
    //         roomId: { type: String },
    //         status: { type: Number, default: 0 },
    //         created_at: { type: String, trim: true }
    //       }
    //     ]
    //   }
    // ],
    // followerCount: { type: Number, required: false, default: 0 },
    // following: {
    //   users: { type: [mongoose.Types.ObjectId], required: false },
    //   daos: { type: [mongoose.Types.ObjectId], required: false },
    //   coins: { type: [mongoose.Types.ObjectId], required: false },
    //   nfts: { type: [mongoose.Types.ObjectId], required: false },
    // },
    // daoMemberships: {
    //   checked: {
    //     type: Boolean,
    //     default: false,
    //   },
    //   daoIds: {
    //     type: [mongoose.Types.ObjectId],
    //     default: [],
    //   },
    //   required: false,
    // },
    // daos: [
    //   {
    //     name: { type: String, required: false },
    //     symbol: { type: String, required: false, trim: true },
    //     description: { type: String, required: false, trim: true },
    //     profileImageLink: { type: String, required: false, trim: true },
    //     profileImage: {
    //       link: { type: String, required: false, trim: true },
    //       address: { type: String, required: false, trim: true },
    //     },
    //   }
    // ],
    // passportNftAddress: { type: String, default: "" },
    // rooms: [
    //   {
    //     roomId: { type: mongoose.Types.ObjectId, required: false },
    //     roomNo: { type: Number },
    //     title: { type: String, required: true },
    //     subTitle: { type: String },
    //     currentBid: { type: Number, required: true },
    //     imageUrl: { type: String },
    //     modelAssets: { type: Object },
    //     active: { type: Boolean, default: false },
    //     nftStates: [
    //       {
    //         no: { type: Number },
    //         nftAddress: { type: String, trim: true },
    //         link: { type: String, required: false },
    //       },
    //     ],
    //   },
    // ],
    // invitations: [
    //   {
    //     name: { type: String, required: true },
    //     invitor: { type: String },
    //     roomId: { type: String },
    //     type: { type: Boolean },
    //     roomNo: { type: Number },
    //     roomName: { type: String },
    //     link: { type: String },
    //     state: { type: Boolean },
    //   },
    // ],
    // nonce: String,
    // lastAnalysisTime: Date,
    // visible: {
    //   type: Boolean,
    //   default: false,
    // },
    // stepsCompleted: {
    //   infoAdded: {
    //     type: Boolean,
    //     default: false,
    //   },
    //   accountsLinked: {
    //     type: Boolean,
    //     default: false,
    //   },
    //   daoClaimed: {
    //     type: Boolean,
    //     default: false,
    //   },
    //   profilePicUpdated: {
    //     type: Boolean,
    //     default: false,
    //   },
    // },
    // registerStep: {
    //   type: Number,
    //   default: 1
    // },
    // passportStyle: {
    //   logo: { type: String, required: false, trim: true },
    //   background: { type: String, required: false, trim: true },
    //   line: { type: String, required: false, trim: true },
    //   text: { type: String, required: false, trim: true },
    // },
    // badges: [{
    //   icon: { type: String, required: false, trim: true },
    //   name: { type: String, required: false, trim: true }
    // }]
  },
  {
    autoIndex: true,
    timestamps: true,
    toJSON: { getters: true },
  }
);
const UserModel = mongoose.model("users", userSchema);

export default UserModel;
