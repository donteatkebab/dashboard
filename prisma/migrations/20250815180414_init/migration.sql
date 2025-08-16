/*
  Warnings:

  - You are about to drop the column `regularPrice` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `salePrice` on the `Product` table. All the data in the column will be lost.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "regularPrice",
DROP COLUMN "salePrice",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
