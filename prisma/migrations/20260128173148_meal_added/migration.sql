-- CreateTable
CREATE TABLE "Meal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cuisine_type" TEXT NOT NULL,
    "dietry_type" TEXT NOT NULL,
    "availabilty_status" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "provider_id" TEXT NOT NULL,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
