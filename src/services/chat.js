const globalChatModel = [];
const YGGChatModel = [];
class ChatService {

  async create(messages) {
    globalChatModel = messages;
  }

  async addMessage(message) {
    if(globalChatModel.length == 1000) {
      globalChatModel.shift();
    }
    globalChatModel.push(message);
  }

  async addYGGMessage(message) {
    if(YGGChatModel.length == 1000) {
      YGGChatModel.shift();
    }
    YGGChatModel.push(message);
  }

  async getMessages() {
    return globalChatModel;
  }

  async getYGGMessages() {
    return YGGChatModel;
  }
}

module.exports = new ChatService();
