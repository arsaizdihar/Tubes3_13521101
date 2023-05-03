/*
 Warnings:
 
 - You are about to drop the column `answer` on the `ChatHistory` table. All the data in the column will be lost.
 
 */
-- AlterTable
ALTER TABLE
  "ChatHistory" DROP COLUMN "answer",
ADD
  COLUMN "answers" TEXT [];