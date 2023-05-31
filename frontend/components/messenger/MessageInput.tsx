import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { chatIdVar, showEmojiVar } from "./messengerState";
import { Mutation } from "@/__generated__/graphql";
import { useLogginedUserdata } from "@/hooks/user";
import { messageType } from "@/../types/chatType";
import { MessageDto } from "@/components/messenger/messageDto";

const sendMesageGql = gql(`
mutation sendMessage($input: MessageInput) {
  sendMessage(input: $input) {
    message
    timeStamp
    userId
  }
}
`);
function MessageInput({
  scrollElem: scrollRef,
}: {
  scrollElem: React.MutableRefObject<null>;
}) {
  const { data: logginedUserData, loading } = useLogginedUserdata();
  const chatId = useReactiveVar(chatIdVar);

  const [val, setVal] = useState<any>("");
  const showEmoji = useReactiveVar(showEmojiVar);

  const [messageFn, { data }] = useMutation<Mutation>(sendMesageGql);
  if (scrollRef.current) {
    const element = scrollRef.current as HTMLDivElement;
    console.log(element.scrollHeight);
    setTimeout(() => {
      element.scrollTop = element.scrollHeight;
    }, 100);
  }
  function sendMessage() {
    if (!chatId) {
      return;
    }
    const message = new MessageDto({
      chatId: chatId,
      userId: logginedUserData.user._id,
      timeStamp: Date.now().toString(),
      message: val,
    });

    messageFn({
      variables: {
        input: message,
      },
    });

    setVal("");
  }
  return (
    <div className="relative">
      {showEmoji && (
        <div className="absolute -top-[450px]">
          <EmojiPicker
            onEmojiClick={(e) => setVal((prev: string) => prev + e.emoji)}
          />
        </div>
      )}

      <div className=" border-[1px] border-gray-400 rounded-2xl flex ro justify-between  p-2 text-lg space-x-2">
        <div
          className=" text-2xl cursor-pointer"
          onClick={() => showEmojiVar(!showEmoji)}
        >
          😀
        </div>
        <input
          className="flex-1"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onClick={() => showEmojiVar(false)}
        />
        {val && (
          <button
            className=" text-blue-700 font-bold"
            onClick={() => sendMessage()}
          >
            Send
          </button>
        )}
      </div>
    </div>
  );
}

export default MessageInput;
