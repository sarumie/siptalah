/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Presence` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Presence` table. All the data in the column will be lost.
  - You are about to drop the column `precenseId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[fullName,nip]` on the table `Administrator` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,acronym]` on the table `Major` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fullName,nis]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fullName` to the `Administrator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_administratorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_precenseId_fkey";

-- DropIndex
DROP INDEX "Administrator_nip_key";

-- DropIndex
DROP INDEX "Student_deviceId_nis_key";

-- AlterTable
ALTER TABLE "Administrator" ADD COLUMN     "fullName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Presence" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "openAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "precenseId",
DROP COLUMN "status",
ADD COLUMN     "fullName" TEXT NOT NULL;

-- DropTable
DROP TABLE "Profile";

-- CreateTable
CREATE TABLE "PresenceToStudent" (
    "presenceId" INTEGER NOT NULL,
    "studentId" INTEGER,
    "status" "Status" NOT NULL DEFAULT 'Alpha',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PresenceToStudent_pkey" PRIMARY KEY ("presenceId")
);

-- CreateIndex
CREATE INDEX "Administrator_fullName_nip_idx" ON "Administrator"("fullName", "nip");

-- CreateIndex
CREATE UNIQUE INDEX "Administrator_fullName_nip_key" ON "Administrator"("fullName", "nip");

-- CreateIndex
CREATE UNIQUE INDEX "Major_name_acronym_key" ON "Major"("name", "acronym");

-- CreateIndex
CREATE INDEX "Student_fullName_nis_idx" ON "Student"("fullName", "nis");

-- CreateIndex
CREATE UNIQUE INDEX "Student_fullName_nis_key" ON "Student"("fullName", "nis");

-- AddForeignKey
ALTER TABLE "PresenceToStudent" ADD CONSTRAINT "PresenceToStudent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PresenceToStudent" ADD CONSTRAINT "PresenceToStudent_presenceId_fkey" FOREIGN KEY ("presenceId") REFERENCES "Presence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
