import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

export function useNewChat() {
  const queryClient = useQueryClient();
  const router = useRouter();

  function newChatHandler() {
    const data = queryClient.getQueryData<Array<any>>(["messages"], {
      exact: false,
      type: "active",
    });

    if (data && data.length) {
      router.push("/");
    }
  }

  return newChatHandler;
}
