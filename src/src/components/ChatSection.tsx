import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useRef } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import TextareaAutosize from "react-textarea-autosize";
import { ApiHistory, postMessage } from "~/utils/api-client";
import { ApiChatMessage } from "~/utils/type";

function ChatSection() {
  const roomId = useRouter().query.roomId as string;
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();
  const messageMutation = useMutation({
    mutationFn: postMessage,
    onSuccess(data, variables, context) {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      const queryData = queryClient.getQueryData<Array<ApiChatMessage>>([
        "messages",
        variables.roomId,
      ]);
      const historyQueryData = queryClient.getQueryData<Array<ApiHistory>>([
        "histories",
      ]);
      if (queryData) {
        queryClient.setQueryData<Array<ApiChatMessage>>(
          ["messages", variables.roomId],
          [...queryData, data]
        );
      } else {
        queryClient.setQueryData<Array<ApiChatMessage>>(
          ["messages", variables.roomId],
          [data]
        );
      }

      if (historyQueryData) {
        const newHistories = [...historyQueryData];
        const historyIndex = newHistories.findIndex(
          (h) => h.roomId === data.roomId
        );
        if (historyIndex !== -1) {
          newHistories[historyIndex] = {
            ...newHistories[historyIndex]!,
            question: data.question,
          };
        } else {
          newHistories.unshift({
            roomId: data.roomId,
            question: data.question,
          });
        }
        queryClient.setQueryData<Array<ApiHistory>>(
          ["histories"],
          newHistories
        );
      }
    },
  });
  return (
    <div className="relative flex h-full w-full flex-1 flex-col items-stretch overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <ScrollToBottom className="h-full bg-gray-800">
          <div className="flex flex-col items-center bg-gray-800 text-sm">
            <div className="w-full px-6 text-gray-800 dark:text-gray-100 md:flex md:h-full md:max-w-2xl md:flex-col lg:max-w-3xl">
              <h1 className="mb-10 ml-auto mr-auto mt-6 flex items-center justify-center gap-2 text-center text-4xl font-semibold sm:mb-16 sm:mt-[20vh]">
                ChitGPT
              </h1>
            </div>
          </div>
        </ScrollToBottom>
        <div className="absolute bottom-0 left-0 w-full border-t border-white/20 bg-gray-800 pt-2 md:border-t-0 md:border-transparent md:!bg-transparent">
          <form
            className="mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"
            onSubmit={(e) => {
              e.preventDefault();
              if (messageMutation.isLoading) {
                return;
              }
              const form = e.currentTarget;
              const formData = new FormData(form);
              const message = formData.get("message");
              console.log(message);
              if (typeof message !== "string" || message.length === 0) {
                return;
              }
              messageMutation.mutate({ roomId, message });
            }}
          >
            <div className="relative flex h-full flex-1 md:flex-col">
              <div className="ml-1 flex justify-center gap-0 md:m-auto md:mb-2 md:w-full md:gap-2"></div>
              <div className="relative flex w-full flex-grow flex-col rounded-md border border-gray-900/50 bg-gray-700 py-2 text-white shadow-[0_0_15px_rgba(0,0,0,0.10)] md:py-3 md:pl-4">
                <TextareaAutosize
                  maxRows={8}
                  placeholder="Send a message..."
                  className="m-0 w-full resize-none border-0 bg-transparent p-0 pl-2 pr-7 outline-none placeholder:text-[#acacbe] focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pl-0"
                  ref={inputRef}
                  name="message"
                />
                <button
                  className="absolute bottom-1.5 right-1 rounded-md p-1 text-gray-500 hover:bg-gray-900 enabled:hover:text-gray-400 disabled:opacity-40 disabled:hover:bg-transparent md:bottom-2.5 md:right-2"
                  disabled={messageMutation.isLoading}
                >
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1 h-4 w-4"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatSection;
