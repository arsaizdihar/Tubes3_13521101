import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { getChats } from "~/utils/api-client";
import Chat, { TypingBotChats } from "./Chat";
import HomeView from "./HomeView";
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
          <div className="flex h-full flex-col items-center bg-gray-800 text-sm">
            {chats && !chats.length && loadingMessage == null && <HomeView />}
            {chats?.map((chat) => (
              <React.Fragment key={chat.id}>
                <Chat message={chat.question} />
                {chat.isNew ? (
                  <TypingBotChats messages={chat.answers} />
                ) : (
                  chat.answers.map((answer, idx) => (
                    <Chat message={answer} key={idx} isBot />
                  ))
                )}
              </React.Fragment>
            ))}
            {loadingMessage != null && (
              <>
                <Chat message={loadingMessage} />
                <Chat message="" isBot isLoading />
              </>
            )}
            {((chats && chats.length !== 0) || loadingMessage !== null) && (
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
