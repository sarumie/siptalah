/*
  Warnings:

  - You are about to drop the column `role` on the `Administrator` table. All the data in the column will be lost.
  - Added the required column `level` to the `Administrator` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LEVEL" AS ENUM ('HIGHEST', 'BASIC');

-- AlterTable
ALTER TABLE "Administrator" DROP COLUMN "role",
ADD COLUMN     "level" "LEVEL" NOT NULL;

-- DropEnum
DROP TYPE "ROLE";
