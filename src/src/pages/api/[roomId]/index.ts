import { createHandler } from "~/server/api-handler";
import { prisma } from "~/server/db";

const handler = createHandler();

handler.delete(async (req, res) => {
  const roomId = req.query.roomId as string;

  await prisma.chatHistory.deleteMany({
    where: {
      roomId,
    },
  });

  res.status(200).json({ message: "success" });
});

export default handler;
