/*
  Warnings:

  - You are about to drop the column `originalUserEmail` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `updatedDate` on the `Review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "originalUserEmail",
DROP COLUMN "updatedDate";
