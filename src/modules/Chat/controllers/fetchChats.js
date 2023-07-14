import { errorResponse, successResponse, throwError } from "../../../utils";
import ChatModel from '../model';

export const fetchChatsController = async (req, res) => {
  try {
    const {
      session: { userId }
    } = req;

    var chats = await ChatModel.find({"users": {$all: [userId]}}).populate('users');

    var tmpChats = [];
    for(var j = 0; j < chats.length; j ++) {
      var chat = chats[j];
      var unreadCount = 0;
      for(var i = chat.msgs.length - 1; i >= 0; i --) {
        if(chat.msgs[i].readState == false && chat.msgs[i].sender != userId) {
          unreadCount ++;
        } else {
          break;
        }
      }
      tmpChats.push({
        _id: chat._id,
        users: chat.users,
        blockState: chat.blockState,
        type: chat.type,
        unreadCount,
        lastMsg: chat.msgs[chat.msgs.length - 1]
      })
    }

    return successResponse({ res, response: { chats: tmpChats } });
  } catch (err) {
    return errorResponse({ res, err });
  }
};
