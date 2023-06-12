-- CreateTable
CREATE TABLE "provider" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "api_url" TEXT NOT NULL,
    "api_key" TEXT NOT NULL,

    CONSTRAINT "provider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "storage_parts" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "part_position" INTEGER NOT NULL,
    "storage_id" TEXT NOT NULL,
    "external_id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,

    CONSTRAINT "storage_parts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "storage_parts" ADD CONSTRAINT "storage_parts_storage_id_fkey" FOREIGN KEY ("storage_id") REFERENCES "storages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "storage_parts" ADD CONSTRAINT "storage_parts_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
