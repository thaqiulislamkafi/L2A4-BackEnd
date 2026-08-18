-- CreateTable
CREATE TABLE "MealAnalytics" (
    "id" TEXT NOT NULL,
    "mealId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "totalReviews" INTEGER NOT NULL DEFAULT 0,
    "totalOrders" INTEGER NOT NULL DEFAULT 0,
    "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MealAnalytics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MealAnalytics" ADD CONSTRAINT "MealAnalytics_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealAnalytics" ADD CONSTRAINT "MealAnalytics_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
