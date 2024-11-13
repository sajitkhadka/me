/*
  Warnings:

  - You are about to drop the column `description` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "type" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "description";
