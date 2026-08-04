-- CreateTable
CREATE TABLE "DashboardStats" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "usersJoined" INTEGER NOT NULL DEFAULT 0,
    "providersJoined" INTEGER NOT NULL DEFAULT 0,
    "mealsCreated" INTEGER NOT NULL DEFAULT 0,
    "reviewsCreated" INTEGER NOT NULL DEFAULT 0,
    "globalReviewsCreated" INTEGER NOT NULL DEFAULT 0,
    "ordersCreated" INTEGER NOT NULL DEFAULT 0,
    "orderItemsCreated" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "DashboardStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DashboardStats_year_month_key" ON "DashboardStats"("year", "month");
