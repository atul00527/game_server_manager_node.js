/*
  Warnings:

  - You are about to drop the column `maxPLayer` on the `Game` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sessionID,playerID]` on the table `GameSessionPlayer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `maxPlayer` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Game" DROP COLUMN "maxPLayer",
ADD COLUMN     "maxPlayer" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."GameSession" ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "GameUrl" TEXT,
ADD COLUMN     "ProcessID" INTEGER,
ADD COLUMN     "StartedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "GameSessionPlayer_sessionID_playerID_key" ON "public"."GameSessionPlayer"("sessionID", "playerID");
