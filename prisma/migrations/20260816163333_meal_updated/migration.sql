/*
  Warnings:

  - You are about to drop the column `price` on the `Meal` table. All the data in the column will be lost.
  - Added the required column `availablePieces` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricePerPiece` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPieces` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "price",
ADD COLUMN     "availablePieces" INTEGER NOT NULL,
ADD COLUMN     "pricePerPiece" INTEGER NOT NULL,
ADD COLUMN     "totalPieces" INTEGER NOT NULL;
