-- liquibase formatted sql

-- changeset aruga:make-address-fields-nullable
ALTER TABLE patient ALTER COLUMN address_line1 DROP NOT NULL;
ALTER TABLE patient ALTER COLUMN barangay DROP NOT NULL;
ALTER TABLE patient ALTER COLUMN municipality DROP NOT NULL;
ALTER TABLE patient ALTER COLUMN province DROP NOT NULL;