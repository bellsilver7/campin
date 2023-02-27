-- CreateTable
CREATE TABLE "Campsite" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "intro" TEXT,
    "description" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "imageUrl" TEXT,
    "bookingUrl" TEXT,
    "price" INTEGER,

    CONSTRAINT "Campsite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Amenities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "campsiteId" INTEGER NOT NULL,

    CONSTRAINT "Amenities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Amenities" ADD CONSTRAINT "Amenities_campsiteId_fkey" FOREIGN KEY ("campsiteId") REFERENCES "Campsite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
