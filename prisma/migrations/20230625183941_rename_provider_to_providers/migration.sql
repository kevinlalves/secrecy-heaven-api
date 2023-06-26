/*
  Warnings:

  - You are about to drop the `provider` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "storage_parts" DROP CONSTRAINT "storage_parts_provider_id_fkey";

-- DropTable
DROP TABLE "provider";

-- CreateTable
CREATE TABLE "providers" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "api_url" TEXT NOT NULL,
    "api_key" TEXT NOT NULL,

    CONSTRAINT "providers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "providers_name_key" ON "providers"("name");

-- AddForeignKey
ALTER TABLE "storage_parts" ADD CONSTRAINT "storage_parts_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
