/*
  Warnings:

  - You are about to drop the `employment_categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "testimonials" ADD COLUMN     "image" TEXT;

-- DropTable
DROP TABLE "public"."employment_categories";
