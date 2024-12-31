/*
  Warnings:

  - Changed the type of `creator` on the `Offer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "creator",
ADD COLUMN     "creator" INTEGER NOT NULL,
ALTER COLUMN "raised" SET DEFAULT 0;
