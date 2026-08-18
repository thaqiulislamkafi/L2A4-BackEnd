/*
  Warnings:

  - The `role` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('active', 'banned', 'inactive');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('user', 'admin', 'provider');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "address" TEXT,
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "contact" TEXT NOT NULL DEFAULT '',
DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'user',
DROP COLUMN "status",
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'active';
