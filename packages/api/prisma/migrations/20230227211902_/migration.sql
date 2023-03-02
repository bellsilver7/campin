/*
  Warnings:

  - A unique constraint covering the columns `[contentSrc,contentId]` on the table `Campsite` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contentId` to the `Campsite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentSrc` to the `Campsite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Campsite" ADD COLUMN     "contentId" INTEGER NOT NULL,
ADD COLUMN     "contentSrc" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Campsite_contentSrc_contentId_key" ON "Campsite"("contentSrc", "contentId");
