import { useLogginedUserdata } from "@/hooks/user";
import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import UserPreview from "../UserPreview";
import { chatIdVar, iAmMessagingWithVar, showEmojiVar } from "./messengerState";
import { UserType } from "@/../types/userType";
import { chatsAndFriendsType, unreadMessageType } from "@/../types/chatType";
import {
  getChatMessagsGql,
  useGetChats,
  useGetMessages,
  useUnreadMessagesGet,
} from "@/hooks/chat";
import FindUsers from "./FindUsers";
import { gql, useMutation } from "@apollo/client";
import { Mutation } from "@/__generated__/graphql";
import { Modal } from "../Modal";
import { Settings } from "../profile/Settings";
import { BsFillTrashFill } from "react-icons/bs";
const deleteChatGql = gql(`
mutation DeleteChat($input: deleteChatInput) {
    deleteChat(input: $input) 
  }

`);
const unreadMessagesDeleteGql = gql(`
mutation UnreadChatMessagesDelete($input: deleteUnreadType) {
  unreadChatMessagesDelete(input: $input)
}`);
function Chats({
  logginedUser,
  chats: initialChats,
}: {
  logginedUser: UserType;
  chats: chatsAndFriendsType[];
}) {
  const unreadData = useUnreadMessagesGet(logginedUser._id);
  const [mutateFunctionDeleteUnread, { data: deleteStatus }] =
    useMutation<Mutation>(unreadMessagesDeleteGql);
  const { data: chatsx, refetch: refetchChats } = useGetChats(logginedUser._id);
  const [chats, setChats] = useState(initialChats);
  const [showDel, setShowDel] = useState<string | null>(null);
  const [deleteFn, { data }] = useMutation<Mutation>(deleteChatGql);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    setChats(initialChats);
  }, [initialChats]);
  useEffect(() => {
    unreadData.refetch();
  }, [deleteStatus, unreadData]);
  function deleteUnreadMessages(chatId: string, userId: string) {
    mutateFunctionDeleteUnread({
      variables: {
        input: {
          chatId,
          userId,
        },
      },
    });
  }
  function loadChats(
    e: React.SyntheticEvent,
    chatId: string,
    chat: chatsAndFriendsType,
    userId: string
  ) {
    chatIdVar(chatId);
    iAmMessagingWithVar(chat.chatWithInfo);
    deleteUnreadMessages(chatId, userId);
  }

  useEffect(() => {
    const deletedId = data?.deleteChat as string | undefined;
    if (deletedId) {
      const newChats = chats.filter((chat) => chat.chat._id !== deletedId);
      setChats(newChats);
      refetchChats();
    }
  }, [data?.deleteChat]);
  function DeleHandler(chatId: string) {
    deleteFn({
      variables: {
        input: {
          chatId,
          userId: logginedUser._id,
        },
      },
    });
    setDeleteModal(false);
  }

  return (
    <div
      className=" pl-4 pt-10 pr-3 border-r-2   overflow-hidden  overflow-y-scroll  max-sm:text-sm "
      onClick={() => showEmojiVar(false)}
    >
      <h2 className="  font-bold text-xl pb-5">
        {logginedUser.name} {logginedUser.surname}
      </h2>
      <FindUsers />
      <h3 className=" font-bold border-b-2 pb-3">Chats</h3>
      <div className=" space-y-2">
        {chats.map((chat) => (
          <div
            className="  relative flex justify-between items-center "
            key={chat.chat._id}
            onClick={(e) => loadChats(e, chat.chat._id, chat, logginedUser._id)}
            onMouseOver={() => setShowDel(chat.chat._id)}
            onMouseLeave={() => setShowDel(null)}
          >
            <UserPreview user={chat.chatWithInfo} dissabled={true} />
            <Unread unreadData={unreadData.data} chatId={chat.chat._id} />
            {showDel === chat.chat._id && (
              <button
                id="deleteBtn"
                className=" bg-red-400 hover:bg-red-600 h-fit p-1 text-white rounded-md  "
                onClick={(e) => {
                  console.log(e.currentTarget);
                  setDeleteModal(true);
                  setShowDel(null);
                }}
              >
                <BsFillTrashFill />
              </button>
            )}
            {deleteModal && (
              <Modal modal={deleteModal} setModal={() => setDeleteModal(false)}>
                <div>
                  <div className=" p-5 text-lg text-center">
                    <div> Are you sure Delete Chat!</div>
                    <small>All messaged will be lost</small>
                  </div>

                  <Settings>
                    <div
                      className=" text-red-500  "
                      onClick={() => DeleHandler(chat.chat._id)}
                    >
                      Yes
                    </div>
                    <div
                      className=" "
                       onClick={() => setDeleteModal(!deleteModal)}
                    >
                      Cancell
                    </div>
                  </Settings>
                </div>
              </Modal>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chats;

function Unread(props: {
  unreadData: unreadMessageType[] | undefined;
  chatId: string;
}) {
  const length = props?.unreadData?.filter(
    (chat) => chat.chatId === props.chatId
  ).length;
  return (
    <div>
      {!!length && (
        <div className=" absolute  self-center left-10 top-0 bg-red-600 text-xl w-6 h-6 flex justify-center  items-center  text-white  rounded-full">
          {length}
        </div>
      )}
    </div>
  );
}
