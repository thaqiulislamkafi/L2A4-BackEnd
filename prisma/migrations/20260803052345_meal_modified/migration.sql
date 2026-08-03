-- DropForeignKey
ALTER TABLE "GlobalReview" DROP CONSTRAINT "GlobalReview_user_id_fkey";

-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "isHeroContent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isSliderContent" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "GlobalReview" ADD CONSTRAINT "GlobalReview_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
