-- CreateTable
CREATE TABLE "ChatStorage" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "ChatStorage_pkey" PRIMARY KEY ("id")
);
