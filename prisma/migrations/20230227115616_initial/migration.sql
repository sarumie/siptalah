-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('HIGHEST', 'BASIC');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Hadir', 'Izin', 'Sakit', 'Alpha', 'Terlambat');

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "administratorId" INTEGER,
    "studentId" INTEGER,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "placement" TEXT NOT NULL,
    "nis" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Alpha',
    "precenseId" INTEGER,
    "absenceId" INTEGER NOT NULL,
    "deviceId" TEXT,
    "deviceName" TEXT,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Administrator" (
    "id" SERIAL NOT NULL,
    "nip" TEXT NOT NULL,
    "role" "ROLE" NOT NULL,
    "access" TEXT[],

    CONSTRAINT "Administrator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Presence" (
    "id" SERIAL NOT NULL,
    "open" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Presence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Major" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "acronym" TEXT NOT NULL,
    "class" TEXT[],
    "group" TEXT[],

    CONSTRAINT "Major_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_administratorId_key" ON "Profile"("administratorId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_studentId_key" ON "Profile"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_deviceId_nis_key" ON "Student"("deviceId", "nis");

-- CreateIndex
CREATE UNIQUE INDEX "Administrator_nip_key" ON "Administrator"("nip");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_administratorId_fkey" FOREIGN KEY ("administratorId") REFERENCES "Administrator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_precenseId_fkey" FOREIGN KEY ("precenseId") REFERENCES "Presence"("id") ON DELETE SET NULL ON UPDATE CASCADE;
