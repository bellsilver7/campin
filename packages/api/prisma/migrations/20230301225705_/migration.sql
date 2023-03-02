/*
  Warnings:

  - You are about to drop the column `bookingUrl` on the `Campsite` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Campsite" DROP COLUMN "bookingUrl",
ADD COLUMN     "reservationUrl" TEXT;
