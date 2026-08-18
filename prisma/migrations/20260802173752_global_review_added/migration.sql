-- CreateTable
CREATE TABLE "GlobalReview" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GlobalReview_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GlobalReview" ADD CONSTRAINT "GlobalReview_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
