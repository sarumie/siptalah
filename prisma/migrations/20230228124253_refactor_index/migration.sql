/*
  Warnings:

  - A unique constraint covering the columns `[fullName]` on the table `Administrator` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nip]` on the table `Administrator` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Major` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[acronym]` on the table `Major` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fullName]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nis]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Administrator_fullName_nip_key";

-- DropIndex
DROP INDEX "Major_name_acronym_key";

-- DropIndex
DROP INDEX "Student_fullName_nis_key";

-- CreateIndex
CREATE UNIQUE INDEX "Administrator_fullName_key" ON "Administrator"("fullName");

-- CreateIndex
CREATE UNIQUE INDEX "Administrator_nip_key" ON "Administrator"("nip");

-- CreateIndex
CREATE UNIQUE INDEX "Major_name_key" ON "Major"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Major_acronym_key" ON "Major"("acronym");

-- CreateIndex
CREATE INDEX "Major_name_idx" ON "Major"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Student_fullName_key" ON "Student"("fullName");

-- CreateIndex
CREATE UNIQUE INDEX "Student_nis_key" ON "Student"("nis");
