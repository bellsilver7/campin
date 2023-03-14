-- CreateTable
CREATE TABLE "Campsite" (
    "id" TEXT NOT NULL,
    "contentId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "intro" TEXT,
    "description" TEXT,
    "imageUrl" TEXT,
    "reservationUrl" TEXT,
    "price" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Campsite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Amenity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "campsiteId" TEXT NOT NULL,

    CONSTRAINT "Amenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "campsiteId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Campsite_contentId_key" ON "Campsite"("contentId");

-- AddForeignKey
ALTER TABLE "Amenity" ADD CONSTRAINT "Amenity_campsiteId_fkey" FOREIGN KEY ("campsiteId") REFERENCES "Campsite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_campsiteId_fkey" FOREIGN KEY ("campsiteId") REFERENCES "Campsite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
