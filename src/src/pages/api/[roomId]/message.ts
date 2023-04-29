import { Calculator } from "src/algorithm/calculator";
import { z } from "zod";
import { DateQuestion } from "~/algorithm/date";
import { Question } from "~/algorithm/question";
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
  const calculator = new Calculator();
  const question = new Question("KMP");
  const algorithms = [calculator, question];
  const algorithm = algorithms.find((algorithm) => algorithm.isMatch(message));
  const dateRegex = /^(?:Hari apa )?(\d{1,2}\/\d{1,2}\/\d{4})\?$/;
  const calcRegex = /^[\d+\-*/^()?\s]+(\?)?$/;
  let reply: string;
  if (!algorithm) {
    reply = "Tidak mengerti maksud kamu :(";
  } else if (/^[\d+\-*/^()?\s]+(\?)?$/.test(message)) {
    // input sesuai format calcu
    const expression = message.replace(/\?/g, "");
    reply =
      "Hasilnya adalah " + new Calculator().getResponse(expression).toString();
  } else if (dateRegex.test(message)) {
    // Date Feature
    const expression = message.replace(/\?/g, "").replace(/\Hari apa /g, "");
    // console.log(expression);
    reply = new DateQuestion().getResponse(expression).toString();
  } else if (calcRegex.test(message)) {
    // Calculator Feature
    const expression = message.replace(/\?/g, "");
    reply =
      "Hasilnya adalah " + new Calculator().getResponse(expression).toString();
  } else {
    reply = algorithm.getResponse(message);
  }

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
