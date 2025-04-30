-- CreateEnum
CREATE TYPE "intervention_type" AS ENUM ('technique', 'Non technique');

-- CreateEnum
CREATE TYPE "level" AS ENUM ('modéré', 'critique', 'mineur');

-- CreateEnum
CREATE TYPE "state_enum" AS ENUM ('en_service', 'defectueux', 'en_maintenance');

-- CreateEnum
CREATE TYPE "type" AS ENUM ('technique', 'Non technique');

-- CreateTable
CREATE TABLE "alert" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "time" TIME(6) NOT NULL,
    "date" DATE NOT NULL,
    "zone" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "device_id" INTEGER,
    "level" "level",

    CONSTRAINT "alert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "device" (
    "id" SERIAL NOT NULL,
    "type_id" INTEGER NOT NULL,
    "state_type_id" INTEGER NOT NULL,
    "user_id" INTEGER,
    "mac_address" VARCHAR NOT NULL,
    "software_version" VARCHAR NOT NULL,
    "date_of_service" DATE NOT NULL,
    "comm_state" BOOLEAN NOT NULL,
    "connection_state" BOOLEAN DEFAULT true,
    "battery_capacity" INTEGER NOT NULL DEFAULT 0,
    "price" REAL,

    CONSTRAINT "device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "device_type" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(100) NOT NULL,

    CONSTRAINT "device_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emergency_contact" (
    "id" BIGSERIAL NOT NULL,
    "label" VARCHAR,
    "number" VARCHAR,

    CONSTRAINT "emergency_contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "env_delimiter" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),
    "env_id" INTEGER,
    "coordinates" JSON,

    CONSTRAINT "env_delimiter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "env_user" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "env_id" INTEGER,

    CONSTRAINT "env_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "environment" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR,
    "address" VARCHAR,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),
    "map_id" INTEGER,
    "is_public" BOOLEAN DEFAULT false,
    "surface" REAL,

    CONSTRAINT "environment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "format" (
    "id" SERIAL NOT NULL,
    "format" VARCHAR NOT NULL,

    CONSTRAINT "format_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "helper_user" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "helper_id" INTEGER,
    "state" VARCHAR DEFAULT 'Pending',

    CONSTRAINT "helper_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "intervention_history" (
    "id" SERIAL NOT NULL,
    "device_id" INTEGER,
    "maintenancier_id" INTEGER,
    "scheduled_date" TIMESTAMP(6) NOT NULL,
    "completion_date" TIMESTAMP(6),
    "description" TEXT,
    "status" TEXT,
    "type" "intervention_type",

    CONSTRAINT "intervention_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "map" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "format_id" INTEGER,

    CONSTRAINT "map_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "panne_history" (
    "id" SERIAL NOT NULL,
    "alert_id" INTEGER,

    CONSTRAINT "panne_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poi" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "env_id" INTEGER,
    "category_id" INTEGER,
    "name" VARCHAR,
    "description" VARCHAR,
    "coordinates" JSON,
    "image_url" VARCHAR,
    "map_id" INTEGER,

    CONSTRAINT "poi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poi_category" (
    "id" SERIAL NOT NULL,
    "category" VARCHAR NOT NULL,

    CONSTRAINT "poi_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poi_zone" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "poi_id" INTEGER,
    "zone_id" INTEGER,

    CONSTRAINT "poi_zone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pricing" (
    "id" SERIAL NOT NULL,
    "attribute" VARCHAR,
    "price" REAL,

    CONSTRAINT "pricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_history" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,
    "device_id" INTEGER,
    "public" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "purchase_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "state_type" (
    "id" SERIAL NOT NULL,
    "state" VARCHAR,

    CONSTRAINT "state_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "family_name" VARCHAR,
    "first_name" VARCHAR,
    "phone_number" VARCHAR,
    "password" VARCHAR,
    "userTypeId" INTEGER,
    "email" VARCHAR,
    "sex" VARCHAR,
    "street" VARCHAR,
    "city" VARCHAR,
    "birth_date" TIMESTAMP(3),
    "Identifier" VARCHAR,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_type" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" VARCHAR,

    CONSTRAINT "user_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zone" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "env_id" INTEGER,
    "name" VARCHAR,
    "description" VARCHAR,
    "type_id" INTEGER,
    "coordinates" JSON,
    "updated_at" TIMESTAMP(6),
    "map_id" INTEGER,

    CONSTRAINT "zone_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "device_type_type_key" ON "device_type"("type");

-- CreateIndex
CREATE UNIQUE INDEX "pricing_attribute_key" ON "pricing"("attribute");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "alert" ADD CONSTRAINT "fk_device" FOREIGN KEY ("device_id") REFERENCES "device"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "device" ADD CONSTRAINT "device_state_type_id_fkey" FOREIGN KEY ("state_type_id") REFERENCES "state_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "device" ADD CONSTRAINT "device_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "device_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "device" ADD CONSTRAINT "device_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "env_user" ADD CONSTRAINT "env_user_env_id_fkey" FOREIGN KEY ("env_id") REFERENCES "environment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "env_user" ADD CONSTRAINT "env_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "environment" ADD CONSTRAINT "environment_map_id_fkey" FOREIGN KEY ("map_id") REFERENCES "map"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "helper_user" ADD CONSTRAINT "helper_user_helper_id_fkey" FOREIGN KEY ("helper_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "helper_user" ADD CONSTRAINT "helper_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "intervention_history" ADD CONSTRAINT "intervention_history_maintenancier_id_fkey" FOREIGN KEY ("maintenancier_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "map" ADD CONSTRAINT "map_format_id_fkey" FOREIGN KEY ("format_id") REFERENCES "format"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "panne_history" ADD CONSTRAINT "panne_history_alert_id_fkey" FOREIGN KEY ("alert_id") REFERENCES "alert"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "poi" ADD CONSTRAINT "poi_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "poi_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi" ADD CONSTRAINT "poi_env_id_fkey" FOREIGN KEY ("env_id") REFERENCES "environment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi" ADD CONSTRAINT "poi_map_id_fkey" FOREIGN KEY ("map_id") REFERENCES "map"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "poi_zone" ADD CONSTRAINT "poi_zone_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "poi"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_zone" ADD CONSTRAINT "poi_zone_zone_id_fkey" FOREIGN KEY ("zone_id") REFERENCES "zone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_history" ADD CONSTRAINT "purchase_history_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "device"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "purchase_history" ADD CONSTRAINT "purchase_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_userTypeId_fkey" FOREIGN KEY ("userTypeId") REFERENCES "user_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zone" ADD CONSTRAINT "zone_env_id_fkey" FOREIGN KEY ("env_id") REFERENCES "environment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zone" ADD CONSTRAINT "zone_map_id_fkey" FOREIGN KEY ("map_id") REFERENCES "map"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
