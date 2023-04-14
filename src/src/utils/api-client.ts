import { ChatHistory } from "@prisma/client";
import { ApiChatMessage } from "./type";

export async function postMessage({
  message,
  roomId,
}: {
  message: string;
  roomId: string;
}): Promise<ChatHistory> {
  const response = await fetch(`/api/${roomId}/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to post message");
  }

  return response.json();
}

export type ApiHistory = Pick<ChatHistory, "question" | "roomId">;

export async function getHistories(): Promise<Array<ApiHistory>> {
  const response = await fetch("/api/history");
  if (!response.ok) {
    throw new Error("Failed to get histories");
  }

  return response.json().then((data) => data.histories);
}

export async function getChats(roomId: string): Promise<Array<ApiChatMessage>> {
  const response = await fetch(`/api/${roomId}/message`);
  if (!response.ok) {
    throw new Error("Failed to get chats");
  }

  return response.json().then((data) => data.history);
}
