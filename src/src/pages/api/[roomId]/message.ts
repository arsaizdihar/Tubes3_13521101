import { Calculator } from "src/algorithm/calculator";
import { z } from "zod";
import { DateQuestion } from "~/algorithm/date";
import Hapus from "~/algorithm/hapus";
import { Question } from "~/algorithm/question";
import Tambah from "~/algorithm/tambah";
import { createHandler } from "~/server/api-handler";
import { prisma } from "~/server/db";

const handler = createHandler();

const postSchema = z.object({
  message: z.string(),
  algorithm: z.enum(["KMP", "BM"]),
});

const roomIdSchema = z.string().cuid();

handler.post(async (req, res) => {
  const { message, algorithm: reqAlg } = postSchema.parse(req.body);
  const roomId = roomIdSchema.parse(req.query.roomId);
  const calculator = new Calculator();
  const date = new DateQuestion();
  const question = new Question(reqAlg);
  const hapus = new Hapus(prisma, reqAlg);
  const tambah = new Tambah(prisma, reqAlg, calculator, date, hapus);
  const lines = message.split(/\n+/);
  const responses: string[] = [];
  let anyAlgorithmMatch = false;
  for (const line of lines) {
    const algorithms = [date, calculator, tambah, hapus, question];
    const algorithm = algorithms.find((algorithm) => algorithm.isMatch(line));

    if (algorithm && "data" in algorithm) {
      const storage = await prisma.chatStorage.findMany();
      algorithm.data = storage;
    }

    let reply: string;
    if (!algorithm) {
      continue;
    } else {
      reply = await algorithm.getResponse(line);
      if (reply) {
        anyAlgorithmMatch = true;
        responses.push(reply);
      }
    }
  }
  if (!anyAlgorithmMatch) {
    responses.push("Tidak mengerti maksud kamu :(");
  }
  const newMessage = await prisma.chatHistory.create({
    data: {
      question: message,
      answers: responses,
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
      answers: true,
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
