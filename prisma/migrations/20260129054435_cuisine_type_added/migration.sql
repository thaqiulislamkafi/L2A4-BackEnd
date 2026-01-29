/*
  Warnings:

  - Added the required column `category` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `cuisine_type` on the `Meal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `dietry_type` on the `Meal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "category" INTEGER NOT NULL,
DROP COLUMN "cuisine_type",
ADD COLUMN     "cuisine_type" INTEGER NOT NULL,
DROP COLUMN "dietry_type",
ADD COLUMN     "dietry_type" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Cuisinetype" (
    "id" SERIAL NOT NULL,
    "cuisine_type_name" TEXT NOT NULL,

    CONSTRAINT "Cuisinetype_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dietrytype" (
    "id" SERIAL NOT NULL,
    "dietry_type_name" TEXT NOT NULL,

    CONSTRAINT "Dietrytype_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_category_fkey" FOREIGN KEY ("category") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_cuisine_type_fkey" FOREIGN KEY ("cuisine_type") REFERENCES "Cuisinetype"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_dietry_type_fkey" FOREIGN KEY ("dietry_type") REFERENCES "Dietrytype"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
