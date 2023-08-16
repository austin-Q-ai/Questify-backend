import ACTIONS from "./config/actions";
import roomService from "./room";
import userService, { getOnlineUser } from "./user";
import chatService from "./chat";
import groupService from "./group";
import UserModel from "../modules/User/model";
import TetrisModel from "../modules/Tetris/model";
import ChatModel from "../modules/Chat/model";
import chat from "./chat";

const { DirectSecp256k1HdWallet } = require("@cosmjs/proto-signing");
const { calculateFee } = require("@cosmjs/stargate");
const { getSigningCosmWasmClient } = require("@sei-js/core");

export const socketService = (io) => {
  const socketUserMapping = {};
  var roomIndex = 3;
  //aframe
  const rooms = {};
  const userlist = {};
  groupService.create();
  ///////////
  io.on("connection", (socket) => {
    /******************************-aframe-*****************************/
    let curRoom = null;
    socket.on("send", (data) => {
      if (!!socket.username) {
        data["name"] = socket.username;
        data["avatarUrl"] = socket.avatarUrl;
      }
      io.to(data.to).emit("send", data);
    });

    socket.on("broadcast", (data) => {
      if (!!socket.username) {
        data["name"] = socket.username;
        data["avatarUrl"] = socket.avatarUrl;
      }
      socket.to(curRoom).emit("broadcast", data);
    });
    /////////////////////////////////////////////////////////////////////

    console.log("new connection", socket.id);
    socket.socket_id = socket.id;

    /****************************-Extension-****************************/
    socket.on(ACTIONS.INVITE_TO_FRIEND, async ({ userId }) => {
      const users = userService.userModel.find((s) => s.user._id == userId);
      const invitorInfo = userService.userModel.find(
        (s) => s.user.name == socket.username
      );
      var user = await UserModel.findById(userId);
      if (!user.friends) {
        user.friends = [];
      }
      user.friends.push({
        friend: invitorInfo.user.userId,
        status: 0,
        roomRequests: [],
      });
      user.save();
      return;
      if (users) {
        users.socket.emit(ACTIONS.INVITE_TO_FRIEND, {
          name: invitorInfo.user.name,
          profileImage: invitorInfo.user.profileImage,
          userId: invitorInfo.user._id,
          bio: invitorInfo.user.bio,
        });
      }
    });

    socket.on(ACTIONS.JOIN_EXTENSION, async ({ name }) => {
      try {
        // Add name to socket
        socket.username = name;
        const userIndex = userService.userModel.findIndex(
          (s) => s.user.name == name
        );
        var users = {};
        if (userIndex != -1) {
          if (userService.userModel[userIndex].onlineFlag) {
            userService.userModel[userIndex].socket.emit("logout", {});
          }
          users = userService.joinUser({ userIndex, socket });
        } else {
          users = await userService.createUser({ name, socket });
        }
        if (users != {}) {
          const friends = userService.getFriendsStatus({ Users });
          socket.emit(ACTIONS.USER_INFO_EXTENSION, friends);
          io.sockets.emit(ACTIONS.ADD_USER_EXTENSION, {
            userId: users.user.userId,
            userNo: users.user.userNo,
            name: users.user.name,
            bio: users.user.bio,
            onlineFlag: users.user.onlineFlag,
          });
        }
        console.log("join in extension ", socket.id);
      } catch (error) {
        console.log("JOIN_EXTENSION :", error);
      }
    });

    socket.on(ACTIONS.CHANGE_READ_STATE, ({ msgId }) => {
      ChatModel.updateOne(
        { "msgs._id": msgId },
        { $set: { ["msgs.$.readState"]: false } }
      ).catch((err) => console.log("jk", err.message));
    });

    socket.on(ACTIONS.TYPING_STATE, ({ members, name, state, chatKind }) => {
      if (chatKind == ACTIONS.GLOBAL_CHAT) {
        socket.broadcast.emit(ACTIONS.TYPING_STATE, {
          members,
          state,
          name,
          chatKind,
        });
      } else if (chatKind == ACTIONS.YGG_CHAT) {
        socket.broadcast.emit(ACTIONS.TYPING_STATE, {
          members,
          state,
          name,
          chatKind,
        });
      } else if (chatKind == ACTIONS.GROUP_CHAT) {
        //
      } else {
        // if DM chat
        members.forEach((memberId, index) => {
          const member = userService.userModel.find(
            (s) => s.user.userId == memberId
          );
          if (!!member && index != 0) {
            member.socket.emit(ACTIONS.TYPING_STATE, {
              members,
              state,
              name,
              chatKind,
            });
          }
        });
      }
    });

    socket.on(ACTIONS.SEND_MSG_EXTENSION, async (msg) => {
      try {
        if (msg.groupType == ACTIONS.GLOBAL_CHAT) {
          const sender = userService.userModel.find(
            (s) => s.user.name == socket.username
          );

          msg.sender = sender.user;
          msg.msgId = "GlobalChatId";
          let today = new Date();
          msg.date = today.toLocaleString();

          chatService.addMessage(msg);
          io.sockets.emit(ACTIONS.SEND_MSG_EXTENSION, msg);
        } else if (msg.groupType == ACTIONS.YGG_CHAT) {
          const sender = userService.userModel.find(
            (s) => s.user.name == socket.username
          );

          msg.sender = sender.user;
          msg.msgId = "YGGChatId";
          let today = new Date();
          msg.date = today.toLocaleString();
          chatService.addYGGMessage(msg);
          io.sockets.emit(ACTIONS.SEND_MSG_EXTENSION, msg);
        } else if (msg.groupType == ACTIONS.GROUP_CHAT) {
          // Group chat content
        } else if (msg.groupType == ACTIONS.DM_CHAT) {
          // Send msgs. Members contain you.
          var msgId = "";
          var date = "";
          const sender = userService.userModel.find(
            (s) => s.user.userId == msg.members[0]
          );
          if (!sender) {
            return;
          }
          msg.sender = sender.user;
          for (var index = 0; index < msg.members.length; index++) {
            var memberUserId = msg.members[index];
            const member = userService.userModel.find(
              (s) => s.user.userId == memberUserId
            );
            var tmpOne = {};
            if (index != 0) {
              var oldOne = undefined;
              try {
                oldOne = await ChatModel.findOne({
                  users: { $all: msg.members, $size: msg.members.length },
                  type: msg.groupType,
                  blockState: false,
                });
              } catch (error) {
                console.log("ChatFind", error);
              }
              if (!oldOne) {
                // creating new document for chat.
                try {
                  tmpOne = await ChatModel.create({
                    users: msg.members,
                    type: msg.groupType,
                    msgs: [
                      {
                        sender: msg.members[0],
                        content: msg.content,
                        attachments: msg.attachments,
                        readState: !!member,
                        reply: msg.reply,
                        editState: msg.editState,
                        deleteState: msg.deleteState,
                      },
                    ],
                    blockState: false,
                  });
                } catch (error) {
                  console.log("Chat-save", error);
                }
              } else {
                // If users chat is exist, just pushing message on chat document.
                oldOne.msgs.push({
                  sender: msg.members[0],
                  content: msg.content,
                  reply: msg.reply,
                  attachments: msg.attachments,
                  readState: !!member,
                  editState: msg.editState,
                  deleteState: msg.deleteState,
                });
                tmpOne = await oldOne.save();
              }
              if (!!tmpOne.msgs) {
                msgId = tmpOne.msgs[tmpOne.msgs.length - 1]._id.toString();
                date = tmpOne.msgs[tmpOne.msgs.length - 1].createdAt.toString();
              }
            }
          }
          msg.members.forEach((memberUserId, index) => {
            const member = userService.userModel.find(
              (s) => s.user.userId == memberUserId
            );
            if (!!member) {
              msg.msgId = msgId;
              msg.date = date;
              member.socket.emit(ACTIONS.SEND_MSG_EXTENSION, msg);
            }
          });
        }
      } catch (error) {
        console.log("SEND_MSG_EXTENSION :", error);
      }
    });

    socket.on(ACTIONS.GET_GROUP_MSGS, ({ daoId }) => {
      socket.emit(ACTIONS.GET_GROUP_MSGS, {
        daoId,
        msgs: groupService.getGroupMsgs(daoId),
      });
    });

    socket.on(ACTIONS.SET_USER_NAME, ({ username }) => {
      userlist[username] = socket;
    });

    socket.on(ACTIONS.JOIN, async ({ roomId, user }) => {
      try {
        const {
          modelIndex,
          name,
          roomName,
          title,
          type,
          roomNo,
          avatarUrl,
          imageUrl,
          slideUrls,
        } = user;
        socketUserMapping[socket.id] = user;
        if (roomId == -1) {
          roomId = await roomService.create(roomIndex, {
            name: name,
            modelIndex,
            roomName,
            title,
            type,
            roomNo,
            slideUrls,
            avatarUrl,
            imageUrl,
            sid: socket.id,
          });
          socket.emit(ACTIONS.ROOM_READY, { roomId, title, type, roomNo });
          roomIndex++;
          return;
        } else {
          roomService.joinRoom(roomId, {
            name: name,
            modelIndex,
            avatarUrl,
            sid: socket.id,
          });
        }

        ////////////////////- Aframe Content -////////////////////
        curRoom = "room" + roomId;
        if (!rooms[curRoom]) {
          rooms[curRoom] = {
            occupants: {},
          };
        }

        const joinedTime = Date.now();
        rooms[curRoom].occupants[socket.id] = {
          joinedTime,
          modelIndex,
        };
        socket.emit("connectSuccess", { joinedTime, curRoom });
        const occupants = rooms[curRoom].occupants;
        /////////////////////////////////////////////////////////

        socket.username = user.name;
        socket.modelIndex = modelIndex;
        socket.roomId = roomId;
        socket.roomName = roomName;
        socket.avatarUrl = avatarUrl;

        const room = await roomService.getRoom(roomId);
        if (!!room) {
          socket.emit(ACTIONS.CREATE_ROOM, { roomId, msgs: room.msgs });
          io.sockets.emit(ACTIONS.ROOM_LIST, {
            rooms: roomService.getAllRooms(),
          });

          var clients = room.clients.filter((s) => s != socket.id) || [];
          clients.forEach((clientId) => {
            io.to(clientId).emit(ACTIONS.ADD_PEER, {
              peerId: socket.id,
              createOffer: false,
              user,
            });

            socket.emit(ACTIONS.ADD_PEER, {
              peerId: clientId,
              createOffer: true,
              user: socketUserMapping[clientId],
            });
          });

          socket.join("room" + roomId);
          io.in(curRoom).emit("occupantsChanged", { occupants });
          console.log(`${socket.id} joined in room ${roomId}`);
        }
      } catch (err) {
        console.log(err);
      }
    });

    socket.on(ACTIONS.CHANGE_SLIDE, ({ action }) => {
      io.to(curRoom).emit(ACTIONS.CHANGE_SLIDE, { action });
    });

    socket.on(ACTIONS.GET_USERS, () => {
      try {
        User.find().then((users, err) => {
          if (err) {
            console.log("User Error", err);
            return;
          }
          socket.emit(ACTIONS.GET_USERS, users);
        });
      } catch (error) {
        console.log("GET_USERS", error);
      }
    });

    socket.on(ACTIONS.ROOM_LIST, () => {
      io.sockets.emit(ACTIONS.ROOM_LIST, { rooms: roomService.getAllRooms() });
    });

    socket.on(ACTIONS.INVITE_FRIEND, async (data) => {
      try {
        let { username, roomId, invitor, type, roomNo } = data;
        let user = await UserModel.findOne({ username: username });
        if (!!user.invitations) {
          for (var i = 0; i < user.invitations.length; i++) {
            if (user.invitations[i].roomId == roomId) {
              socket.emit(ACTIONS.DUPLICATION_INVITATION, {});
              return;
            }
          }
        }
        let invitations = !!user.invitations ? user.invitations : [];
        let link =
          user.publicAddress.slice(5, 10) +
          roomId +
          user.createdAt.toString().slice(20, 21);
        let roomName = await roomService.inviteFriend(username, roomId, link);
        invitations.push({
          name: username,
          invitor: invitor,
          roomId: roomId,
          type: type,
          roomNo: roomNo,
          roomName: roomName,
          link: link,
          state: false,
        });
        user.invitations = invitations;
        user.save();
        io.sockets.emit(ACTIONS.ROOM_LIST, {
          rooms: roomService.getAllRooms(),
        });
      } catch (error) {
        console.log("Invite Friend: ", error);
      }
    });

    socket.on(ACTIONS.ACEEPT_INVITATION, async (data) => {
      let { roomId, username, guestname, type } = data;
      await roomService.completeInvitation(roomId, username, guestname, type);
    });

    socket.on(ACTIONS.GET_INVITATIONS, ({ username }) => {
      try {
        UserModel.findOne({ username: username }).then(async (user) => {
          if (user) {
            try {
              var invitations = [];
              for (let index = 0; index < user.invitations.length; index++) {
                const invitation = user.invitations[index];
                if (invitation.state == false) {
                  let room = await roomService.getRoom(invitation.roomId);
                  if (!!room) {
                    invitations.push(invitation);
                  } else {
                    user.Invitations[index].state = true;
                  }
                }
              }
              user.save();
              socket.emit(ACTIONS.GET_INVITATIONS, { invitations });
            } catch (error) {
              console.log("User", error);
            }
          }
        });
      } catch (error) {
        console.log("get invitations: ", error);
      }
    });

    socket.on(ACTIONS.SEND_MSG, ({ roomId, data }) => {
      io.to("room" + roomId).emit(ACTIONS.SEND_MSG, {
        user: socket.username,
        avatarUrl: data.avatarUrl,
        msg: data,
      });
      roomService.addMsg(roomId, {
        user: socket.username,
        avatarUrl: data.avatarUrl,
        msg: data,
      });
    });

    // handel relay ice
    socket.on(ACTIONS.RELAY_ICE, ({ peerId, iceCandidate }) => {
      io.to(peerId).emit(ACTIONS.ICE_CANDIDATE, {
        peerId: socket.id,
        iceCandidate,
      });
    });

    socket.on(ACTIONS.RELAY_SDP, ({ peerId, sessionDescription }) => {
      io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION, {
        peerId: socket.id,
        sessionDescription,
      });
    });

    // mute or unmute the user
    socket.on(ACTIONS.MUTE, ({ roomId, name }) => {
      const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
      clients.forEach((clientId) => {
        io.to(clientId).emit(ACTIONS.MUTE, {
          peerId: socket.id,
          name,
        });
      });
    });

    socket.on(ACTIONS.UNMUTE, ({ roomId, name }) => {
      const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
      clients.forEach((clientId) => {
        io.to(clientId).emit(ACTIONS.UNMUTE, {
          peerId: socket.id,
          name,
        });
      });
    });

    socket.on(ACTIONS.GET_LEADERBOARD, async ({}) => {
      try {
        // const now = new Date();
        // const currentHour = now.getHours();
        // let lowerBound = new Date(now);
        // let upperBound = new Date(now);
        // lowerBound.setHours(Math.floor(currentHour / 2) * 2, 0, 0, 0);
        // upperBound.setHours(Math.ceil(currentHour / 2) * 2, 0, 0, 0);

        // const data = await TetrisModel.find({
        //   timestamp: {
        //     $gte: lowerBound,
        //     $lt: upperBound,
        //   },
        // })
        //   .select("wallet score amount level createdAt")
        //   .sort({ score: -1 });

        const showInfo = await UserModel.find(
          {},
          { wallet: 1, totalScore: 1, totalXP: 1, totalStar:1 }
        )
          .sort({ totalScore: -1 })
          .limit(5);
        const tetrisInfo = await TetrisModel.find({})
          .sort({ updatedAt: -1 })
          .limit(15);
        io.sockets.emit(ACTIONS.SEND_LEADERBOARD, {
          result: { showInfo, tetrisInfo },
        });
      } catch (err) {
        console.log("tetris", err);
      }
    });

    socket.on(ACTIONS.GET_RESULT_TETRIS, async ({ tetrisId, gameScore }) => {
      try {
        const currentTetris = await TetrisModel.findByIdAndUpdate(tetrisId, {
          score: gameScore,
        });
        // const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
        //   "judge absent panther concert sadness dash know velvet century merry lock clown",
        //   { prefix: "sei" }
        // );
        // const [firstAccount] = await wallet.getAccounts();
        // const client = await getSigningCosmWasmClient(
        //   "https://rpc.atlantic-2.seinetwork.io",
        //   wallet
        // );

        // let transferAmount;

        // // check result and send payment
        // if (currentTetrisModel.level === 1 && score >= currentTetrisModel.goal) {
        //   // Execute a message on a smart contract
        //   transferAmount = {
        //     amount: Math.floor(currentTetrisModel.amount * 1.1 * 1e6).toString(),
        //     denom: "usei",
        //   };
        //   console.log(transferAmount);
        //   const fee = calculateFee(150000, "0.1usei");
        //   await client.sendTokens(
        //     firstAccount.address,
        //     currentTetrisModel.wallet,
        //     [transferAmount],
        //     fee
        //   );
        //   // need to paycheck in tetris table
        // }

        // if (currentTetrisModel.level === 2 && score >= currentTetrisModel.goal) {
        //   // Execute a message on a smart contract
        //   transferAmount = {
        //     amount: Math.floor(currentTetrisModel.amount * 1.3 * 1e6).toString(),
        //     denom: "usei",
        //   };
        //   console.log(transferAmount);
        //   const fee = calculateFee(150000, "0.1usei");
        //   await client.sendTokens(
        //     firstAccount.address,
        //     currentTetrisModel.wallet,
        //     [transferAmount],
        //     fee
        //   );
        //   // need to paycheck in tetris table
        // }

        // if (currentTetrisModel.level === 3 && score >= currentTetrisModel.goal) {
        //   // Execute a message on a smart contract
        //   transferAmount = {
        //     amount: Math.floor(currentTetrisModel.amount * 2 * 1e6).toString(),
        //     denom: "usei",
        //   };
        //   console.log(transferAmount);
        //   const fee = calculateFee(150000, "0.1usei");
        //   await client.sendTokens(
        //     firstAccount.address,
        //     currentTetrisModel.wallet,
        //     [transferAmount],
        //     fee
        //   );
        //   // need to paycheck in tetris table
        // }
        const { wallet, amount, level, goal } = currentTetris;
        if(amount<0){
          return errorResponse({ res, err: "Hacking Attempt Occured!" });
        }
        const existingUser = await UserModel.findOne({ wallet });

        if (existingUser) {
          console.log(existingUser);
          // Update the total score for the existing user
          existingUser.totalScore += gameScore;
          existingUser.totalPlay += 1;
          existingUser.totalXP += Math.floor(gameScore / 2000) * level;

          existingUser.playCount.tetris +=
            existingUser.playCount.tetris === 4 ? 0 : 1;

          const history = await TetrisModel.find({ wallet });
          console.log(history);

          if (history === []) existingUser.achievedQuests.tetris[0] = 1;

          if (existingUser.achievedQuests.tetris[1] < 7) {
            const lastTwoHistory = history.slice(-2);
            const date1 = new Date(lastTwoHistory[0].time);
            date1.setHours(0, 0, 0, 0);
            const date2 = new Date(lastTwoHistory[1].time);
            date2.setHours(0, 0, 0, 0);

            if (Math.abs(date1.getTime() - date2.getTime()) === 86400000) {
              existingUser.achievedQuests.tetris[1] += 1;
            } else if (Math.abs(date1.getTime() - date2.getTime()) > 86400000) {
              existingUser.achievedQuests.tetris[1] = 1;
            }
          }

          if (existingUser.achievedQuests.tetris[2] < 10)
            existingUser.achievedQuests.tetris[2] += 1;

          existingUser.achievedQuests.tetris[level + 2] = 1;

          if (gameScore >= goal) {
            existingUser.totalBalance += 2 * amount;
            existingUser.achievedQuests.tetris[6] = 1;
          }

          await existingUser.save();

          console.log(`Updated user with wallet ${wallet}`);
        } else {
          // Create a new user with the given wallet and total score

          const newUser = new UserModel({
            wallet,
            totalBalance: gameScore >= goal ? 2 * amount : 0,
            totalScore: gameScore,
            totalPlay: 1,
            totalXP: Math.floor(gameScore / 2000) * level,
            achievedQuests: { tetris: [1, 1, 1, 0, 0, 0, 0] },
            playCount: { tetris: 1 },
          });
          newUser.achievedQuests.tetris[level + 2] = 1;
          await newUser.save();
          console.log(`Created new user with wallet ${wallet}`);
        }

        const showInfo = await UserModel.find(
          {},
          { wallet: 1, totalScore: 1, totalXP: 1, totalStar:1}
        )
          .sort({ totalScore: -1 })
          .limit(5);
        // const currentHour = now.getHours();
        // let lowerBound = new Date(now);
        // let upperBound = new Date(now);
        // lowerBound.setHours(Math.floor(currentHour / 2) * 2, 0, 0, 0);
        // upperBound.setHours(Math.ceil(currentHour / 2) * 2, 0, 0, 0);

        // const data = await TetrisModel.find({
        //   timestamp: {
        //     $gte: lowerBound,
        //     $lt: upperBound,
        //   },
        // })
        //   .select("wallet score amount level createdAt")
        //   .sort({ score: -1 });
        const tetrisInfo = await TetrisModel.find({})
          .sort({ updatedAt: -1 })
          .limit(15);
        io.sockets.emit(ACTIONS.SEND_LEADERBOARD, {
          result: { showInfo, tetrisInfo },
        });
      } catch (err) {
        console.log("tetris", err);
      }
    });

    // leaving the room
    const leaveRoomFunc = async ({ roomId, user }) => {
      try {
        //////////////////////- Aframe -////////////////////////
        if (rooms[curRoom]) {
          console.log("user disconnected", socket.id);

          delete rooms[curRoom].occupants[socket.id];
          const occupants = rooms[curRoom].occupants;
          socket.to(curRoom).emit("occupantsChanged", { occupants });

          if (Object.keys(occupants).length === 0) {
            console.log("everybody left room");
            delete rooms[curRoom];
          }
        }
        ///////////////////////////////////////////////////////
        var room = await roomService.getRoom(roomId);
        if (!!room) {
          var clients = room.clients.filter((s) => s != socket.id);

          clients.forEach((clientId) => {
            io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
              peerId: socket.id,
              name: user.name,
              user,
            });
          });
          socket.leave("room" + roomId);
          socket.roomId = -1;

          roomService.leaveRoom(roomId, { name: user.name, sid: socket.id });
          io.sockets.emit(ACTIONS.ROOM_LIST, {
            rooms: roomService.getAllRooms(),
          });
          delete userlist[user.name];
          delete socketUserMapping[socket.id];
        }
        userService.leaveUser(user.name);
      } catch (err) {
        console.log("leave", err);
      }
    };

    socket.on(ACTIONS.LEAVE, leaveRoomFunc);
    socket.on("disconnect", () => {
      leaveRoomFunc({ roomId: socket.roomId, user: { name: socket.username } });
      const user = userService.userModel.find(
        (s) => s.socket.id == socket.socket_id
      );
      if (!!user) {
        user.user.onlineFlag = false;
        io.sockets.emit(ACTIONS.REMOVE_USER_EXTENSION, socket.username);
      }
      console.log("disconnection " + socket.socket_id);
    });
  });
};
