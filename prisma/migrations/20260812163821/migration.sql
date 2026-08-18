/*
  Warnings:

  - A unique constraint covering the columns `[mealId]` on the table `MealAnalytics` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MealAnalytics_mealId_key" ON "MealAnalytics"("mealId");
