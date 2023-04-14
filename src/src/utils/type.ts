import { ChatHistory } from "@prisma/client";

export type ApiChatMessage = Omit<ChatHistory, "roomId">;
