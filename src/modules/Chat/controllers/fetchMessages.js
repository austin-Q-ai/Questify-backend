import ACTIONS from "../../../services/config/actions";
import { errorResponse, successResponse, throwError } from "../../../utils";
import ChatModel from '../model';
import chatService from "../../../services/chat";

export const fetchMessagesController = async (req, res) => {
  try {
    const {
      body: { members, chatKind },
      session: { userId }
    } = req;

    var chat = [];
    if(chatKind == ACTIONS.GLOBAL_CHAT) {
      chat = await chatService.getMessages();
    } else if(chatKind == ACTIONS.YGG_CHAT) {
      chat = await chatService.getYGGMessages();
    } else if (chatKind == ACTIONS.GROUP_CHAT) {

    } else if (chatKind == ACTIONS.DM_CHAT) {
      const data = await ChatModel.findOne({ 
        users: { $all: members, $size: members.length },
      });
      if(!!data) {
        for(var i = 0; i < data.msgs.length; i ++) {
          if(data.msgs[i].sender == userId && data.msgs[i].readState == false) {
            break;
          }
        }
        if(i == data.msgs.length) {
          await ChatModel.update(
            { users: { $all: members, $size: members.length } },
            { $set: { "msgs.$[].readState": true } }
          );
        }
        chat = await ChatModel.findOne({users: {$all: members, $size: members.length}}).populate('msgs.sender');
      }
    }

  return successResponse({ res, response: { chat } });

  } catch (err) {
    return errorResponse({ res, err });
  }
};
