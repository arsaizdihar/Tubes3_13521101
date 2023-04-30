import { z } from "zod";
import { createHandler } from "~/server/api-handler";
import { prisma } from "~/server/db";
import { Calculator } from "src/algorithm/calculator";
import { Question } from "~/algorithm/question";
import Tambah from "~/algorithm/tambah";
import { PrismaClient } from "@prisma/client";
import Hapus from "~/algorithm/hapus";


const handler = createHandler();

// tambah apus
const db = new PrismaClient();
const tambah = new Tambah(db);
const hapus = new Hapus(db);
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
  let reply: string;
  if (!algorithm) {
    reply = "Tidak mengerti maksud kamu :(";
  } 
  else {
    // input sesuai format calcu
    if (/^[\d+\-*/^()?\s]+(\?)?$/.test(message)) {
        const expression = message.replace(/\?/g, '');
        reply = "Hasilnya adalah " + new Calculator().getResponse(expression).toString();
    }  

    // tambah apus
    else if (/^Tambah pertanyaan .* dengan jawaban .*/i.test(message)) {
      reply = await tambah.getResponse(message);  
    }
    else if (/^Hapus pertanyaan .*/i.test(message)) {
      reply = await hapus.getResponse(message);
    }  

    else{
      reply = algorithm.getResponse(message);
    }
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
