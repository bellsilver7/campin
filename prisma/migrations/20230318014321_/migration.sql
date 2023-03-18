-- CreateTable
CREATE TABLE "Campsite" (
    "id" UUID NOT NULL,
    "contentSource" VARCHAR(50) NOT NULL,
    "contentId" VARCHAR(12) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "city" VARCHAR(20) NOT NULL,
    "state" VARCHAR(20) NOT NULL,
    "address" VARCHAR(200) NOT NULL,
    "intro" VARCHAR(200),
    "description" TEXT,
    "imageUrl" VARCHAR,
    "reservationUrl" VARCHAR,
    "price" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Campsite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Amenity" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "campsiteId" UUID NOT NULL,

    CONSTRAINT "Amenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" UUID NOT NULL,
    "rating" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "campsiteId" UUID NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Amenity" ADD CONSTRAINT "Amenity_campsiteId_fkey" FOREIGN KEY ("campsiteId") REFERENCES "Campsite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_campsiteId_fkey" FOREIGN KEY ("campsiteId") REFERENCES "Campsite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
