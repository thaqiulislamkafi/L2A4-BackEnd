/*
  Warnings:

  - You are about to drop the column `createdt` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `createdt` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `generatedAt` on the `FAQ` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "createdt";

-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "createdt";

-- AlterTable
ALTER TABLE "FAQ" DROP COLUMN "generatedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
