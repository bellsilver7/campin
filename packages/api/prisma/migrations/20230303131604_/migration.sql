/*
  Warnings:

  - The primary key for the `Amenities` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Campsite` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Amenities" DROP CONSTRAINT "Amenities_campsiteId_fkey";

-- AlterTable
ALTER TABLE "Amenities" DROP CONSTRAINT "Amenities_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "campsiteId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Amenities_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Amenities_id_seq";

-- AlterTable
ALTER TABLE "Campsite" DROP CONSTRAINT "Campsite_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Campsite_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Campsite_id_seq";

-- AddForeignKey
ALTER TABLE "Amenities" ADD CONSTRAINT "Amenities_campsiteId_fkey" FOREIGN KEY ("campsiteId") REFERENCES "Campsite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
