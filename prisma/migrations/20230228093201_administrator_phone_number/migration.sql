/*
  Warnings:

  - Added the required column `phoneNumber` to the `Administrator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Administrator" ADD COLUMN     "phoneNumber" TEXT NOT NULL;
