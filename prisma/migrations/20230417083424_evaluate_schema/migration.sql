/*
  Warnings:

  - The values [Hadir,Izin,Sakit,Alpha,Terlambat] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `Administrator` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `login` on the `Administrator` table. All the data in the column will be lost.
  - The `level` column on the `Administrator` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Major` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `class` on the `Major` table. All the data in the column will be lost.
  - You are about to drop the column `group` on the `Major` table. All the data in the column will be lost.
  - The primary key for the `Presence` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `open` on the `Presence` table. All the data in the column will be lost.
  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `absenceId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `PresenceToStudent` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Administrator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Major` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Presence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `majorId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Level" AS ENUM ('ADMIN', 'PETUGAS');

-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('HADIR', 'IZIN', 'SAKIT', 'ALPHA');
ALTER TABLE "PresenceToStudent" ALTER COLUMN "status" DROP DEFAULT;
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "PresenceToStudent" DROP CONSTRAINT "PresenceToStudent_presenceId_fkey";

-- DropForeignKey
ALTER TABLE "PresenceToStudent" DROP CONSTRAINT "PresenceToStudent_studentId_fkey";

-- DropIndex
DROP INDEX "Administrator_fullName_key";

-- DropIndex
DROP INDEX "Major_name_idx";

-- DropIndex
DROP INDEX "Student_fullName_key";

-- AlterTable
ALTER TABLE "Administrator" DROP CONSTRAINT "Administrator_pkey",
DROP COLUMN "login",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
DROP COLUMN "level",
ADD COLUMN     "level" "Level" NOT NULL DEFAULT 'PETUGAS',
ADD CONSTRAINT "Administrator_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Administrator_id_seq";

-- AlterTable
ALTER TABLE "Major" DROP CONSTRAINT "Major_pkey",
DROP COLUMN "class",
DROP COLUMN "group",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Major_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Major_id_seq";

-- AlterTable
ALTER TABLE "Presence" DROP CONSTRAINT "Presence_pkey",
DROP COLUMN "open",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isOpen" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Presence_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Presence_id_seq";

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
DROP COLUMN "absenceId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "majorId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Student_id_seq";

-- DropTable
DROP TABLE "PresenceToStudent";

-- DropEnum
DROP TYPE "LEVEL";

-- CreateTable
CREATE TABLE "Class" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "majorId" TEXT,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "majorId" TEXT,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PresenceToStudent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Class_name_key" ON "Class"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Group_name_key" ON "Group"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_PresenceToStudent_AB_unique" ON "_PresenceToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_PresenceToStudent_B_index" ON "_PresenceToStudent"("B");

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PresenceToStudent" ADD CONSTRAINT "_PresenceToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Presence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PresenceToStudent" ADD CONSTRAINT "_PresenceToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
