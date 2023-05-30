import {
  chatType,
  messageType,
  unreadMessageType,
} from "../../../types/chatType";

let unreadMessages = [
  {
    _id: "fsdsddfs",
    userId: "1",
    chatId: "888",
  },
];
let chats: chatType[] = [
  {
    _id: "888",
    users: ["1", "2"],
  },
  {
    _id: "888a",
    users: ["1", "3"],
  },
  {
    _id: "468",
    users: ["4", "2"],
  },
];

let messages = [
  {
    _id: "4575",
    chatId: "888",
    message:
      "how are tou t y n c  georgirrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
    timeStamp: "456666",
    userId: "2",
  },
  {
    _id: "455",
    chatId: "888",
    message: "hello linda",
    timeStamp: "1",
    userId: "1",
  },
];

export const ChatService = {
  getSingleChat: function (chatId: string): chatType | undefined {
    const chat = chats.find((ch) => ch._id === chatId);
    return chat;
  },
  getchats: function (userId: string): Promise<chatType[]> {
    const myChat = chats.filter((item) => item.users.includes(userId));
    return new Promise((res, rej) => {
      res(myChat);
    });
  },

  getchatsMessages: function (chatIdId: string): Promise<messageType[]> {
    const myChat = messages.filter((message) => message.chatId === chatIdId);
    myChat.sort((a, b) => Number(a.timeStamp) - Number(b.timeStamp));
    return new Promise((res, rej) => {
      res(myChat);
    });
  },

  addMessage: function (message: (typeof messages)[0]) {
    messages.push(message);
  },

  eleteMessage: function d(messageId: string) {
    messages = messages.filter((mes) => mes._id !== messageId);
  },

  deleteChat: function (chatId: string, userId: string) {
    messages = messages.filter((mes) => mes.chatId !== chatId);
    chats = chats.filter((chat) => chat._id !== chatId);
    return chatId;
  },

  createChat: function (user1Id: string, user2Id: string) {
    const ischatExist = chats.find(
      (chat) => chat.users.includes(user1Id) && chat.users.includes(user2Id)
    );
    if (ischatExist) {
      throw Error("Chat already exists");
    }
    const id = String(Math.random() * 10);
    const newChat = {
      _id: id,
      users: [user1Id, user2Id],
    };
    chats.push(newChat);
    return newChat;
  },

  unreadMessageGet: async function (
    userId: string
  ): Promise<unreadMessageType[]> {
    return unreadMessages.filter((unread) => unread.userId === userId);
  },
  unreadMessageDelete: async function (chatId: string) {
    unreadMessages = unreadMessages.filter(
      (unread) => unread.chatId !== chatId
    );
  },
  unreadMessageSet: function (unread: Omit<unreadMessageType, "_id">) {
    unreadMessages.push({
      _id: Math.random().toString(),
      ...unread,
    });
  },
};
