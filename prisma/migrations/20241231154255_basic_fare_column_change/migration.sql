/*
  Warnings:

  - Added the required column `adultChildType` to the `BasicFare` table without a default value. This is not possible if the table is not empty.
  - Added the required column `depatureDate` to the `BasicFare` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationDate` to the `BasicFare` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roundTripType` to the `BasicFare` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BasicFare" ADD COLUMN     "adultChildType" INTEGER NOT NULL,
ADD COLUMN     "depatureDate" TEXT NOT NULL,
ADD COLUMN     "destinationDate" TEXT NOT NULL,
ADD COLUMN     "roundTripType" INTEGER NOT NULL;
