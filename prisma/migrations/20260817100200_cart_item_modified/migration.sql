/*
  Warnings:

  - You are about to drop the column `updatedt` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `updatedt` on the `CartItem` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "updatedt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "updatedt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
