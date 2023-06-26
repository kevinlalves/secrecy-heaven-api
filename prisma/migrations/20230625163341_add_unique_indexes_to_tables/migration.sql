/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `provider` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[external_id,provider_id]` on the table `storage_parts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,user_id]` on the table `storages` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "provider_name_key" ON "provider"("name");

-- CreateIndex
CREATE UNIQUE INDEX "storage_parts_external_id_provider_id_key" ON "storage_parts"("external_id", "provider_id");

-- CreateIndex
CREATE UNIQUE INDEX "storages_name_user_id_key" ON "storages"("name", "user_id");
