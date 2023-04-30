import { createHandler } from "~/server/api-handler";
import { prisma } from "~/server/db";

const handler = createHandler();

handler.get(async (req, res) => {
  const roomHistories = await prisma.chatHistory.findMany({
    select: {
      question: true,
      roomId: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    distinct: ["roomId"],
  });

  res.json({ histories: roomHistories });
});

export default handler;
