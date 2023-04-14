import { z } from "zod";
import { createHandler } from "~/server/api-handler";
import { prisma } from "~/server/db";

const handler = createHandler();

const postSchema = z.object({
  message: z.string(),
});

const roomIdSchema = z.string().cuid();

handler.post(async (req, res) => {
  const { message } = postSchema.parse(req.body);
  const roomId = roomIdSchema.parse(req.query.roomId);

  // TODO: run algorithm
  const reply = message;

  const newMessage = await prisma.chatHistory.create({
    data: {
      question: message,
      answer: reply,
      roomId,
    },
  });

  res.json(newMessage);
});

handler.get(async (req, res) => {
  const roomId = roomIdSchema.parse(req.query.roomId);
  const history = await prisma.chatHistory.findMany({
    where: {
      roomId,
    },
    select: {
      answer: true,
      question: true,
      createdAt: true,
      id: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  res.json({ history });
});

export default handler;