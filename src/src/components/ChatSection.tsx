import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { getChats } from "~/utils/api-client";
import Chat from "./Chat";
import MessageForm from "./MessageForm";

function ChatSection() {
  const roomId = useRouter().query.roomId as string;
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);

  const { data: chats } = useQuery(
    ["messages", roomId],
    async () => getChats(roomId),
    {
      enabled: !!roomId,
    }
  );

  return (
    <div className="relative flex h-full w-full flex-1 flex-col items-stretch overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <ScrollToBottom className="h-full bg-gray-800">
          <div className="flex flex-col items-center bg-gray-800 text-sm">
            {chats && !chats.length && (
              <div className="w-full px-6 text-gray-800 dark:text-gray-100 md:flex md:h-full md:max-w-2xl md:flex-col lg:max-w-3xl">
                <h1 className="mb-10 ml-auto mr-auto mt-6 flex items-center justify-center gap-2 text-center text-4xl font-semibold sm:mb-16 sm:mt-[20vh]">
                  ChitGPT
                </h1>
              </div>
            )}
            {chats?.map((chat) => (
              <React.Fragment key={chat.id}>
                <Chat message={chat.question} />
                {chat.answers.map((answer, idx) => (
                  <Chat message={answer} key={idx} isBot />
                ))}
              </React.Fragment>
            ))}
            {loadingMessage != null && (
              <>
                <Chat message={loadingMessage} />
                <Chat message="" isBot isLoading />
              </>
            )}
            {chats && chats.length && (
              <div className="h-32 w-full flex-shrink-0 md:h-48" />
            )}
          </div>
        </ScrollToBottom>
        <MessageForm setLoadingMessage={setLoadingMessage} />
      </div>
    </div>
  );
}

export default ChatSection;
