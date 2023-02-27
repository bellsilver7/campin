/*
  Warnings:

  - You are about to drop the column `contentSrc` on the `Campsite` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[contentId]` on the table `Campsite` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Campsite_contentSrc_contentId_key";

-- AlterTable
ALTER TABLE "Campsite" DROP COLUMN "contentSrc";

-- CreateIndex
CREATE UNIQUE INDEX "Campsite_contentId_key" ON "Campsite"("contentId");
