-- CreateTable
CREATE TABLE "Accommodation" (
    "id" TEXT NOT NULL,
    "namesFallback" TEXT NOT NULL,

    CONSTRAINT "Accommodation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "entryDate" TIMESTAMP(3) NOT NULL,
    "updatedDate" TIMESTAMP(3) NOT NULL,
    "traveledWith" TEXT NOT NULL,
    "travelDate" TIMESTAMP(3) NOT NULL,
    "generalRating" INTEGER,
    "aspectsRatingsId" TEXT NOT NULL,
    "originalUserName" TEXT NOT NULL,
    "originalUserEmail" TEXT NOT NULL,
    "statusId" TEXT NOT NULL,
    "accommodationId" TEXT,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewAspectsRatings" (
    "id" TEXT NOT NULL,
    "location" INTEGER,
    "service" INTEGER,
    "priceQuality" INTEGER,
    "food" INTEGER,
    "room" INTEGER,
    "childFriendly" INTEGER,
    "interior" INTEGER,
    "size" INTEGER,
    "activities" INTEGER,
    "restaurants" INTEGER,
    "sanitaryState" INTEGER,
    "accessibility" INTEGER,
    "nightlife" INTEGER,
    "culture" INTEGER,
    "surrounding" INTEGER,
    "atmosphere" INTEGER,
    "noviceSkiArea" INTEGER,
    "advancedSkiArea" INTEGER,
    "apresSki" INTEGER,
    "beach" INTEGER,
    "entertainment" INTEGER,
    "environmental" INTEGER,
    "pool" INTEGER,
    "terrace" INTEGER,
    "housing" INTEGER,
    "hygiene" INTEGER,

    CONSTRAINT "ReviewAspectsRatings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewStatus" (
    "id" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL,
    "checked" BOOLEAN NOT NULL,
    "reason" TEXT NOT NULL,

    CONSTRAINT "ReviewStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextTranslation" (
    "id" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "payload" TEXT NOT NULL,
    "reviewTitleId" TEXT,
    "reviewTextId" TEXT,
    "accommodationId" TEXT,

    CONSTRAINT "TextTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Review_aspectsRatingsId_key" ON "Review"("aspectsRatingsId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_statusId_key" ON "Review"("statusId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "Accommodation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_aspectsRatingsId_fkey" FOREIGN KEY ("aspectsRatingsId") REFERENCES "ReviewAspectsRatings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "ReviewStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextTranslation" ADD CONSTRAINT "TextTranslation_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "Accommodation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextTranslation" ADD CONSTRAINT "TextTranslation_reviewTitleId_fkey" FOREIGN KEY ("reviewTitleId") REFERENCES "Review"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextTranslation" ADD CONSTRAINT "TextTranslation_reviewTextId_fkey" FOREIGN KEY ("reviewTextId") REFERENCES "Review"("id") ON DELETE SET NULL ON UPDATE CASCADE;
