-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "provider_id" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
