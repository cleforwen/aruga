-- liquibase formatted sql

-- changeset aruga:5
-- Drop the old FK that referenced patient(patient_id) for the dependent
ALTER TABLE patient_dependent DROP CONSTRAINT IF EXISTS fk_dependent;

-- Drop the old column that linked to a patient row
ALTER TABLE patient_dependent DROP COLUMN IF EXISTS dependent_patient_id;

-- Add lightweight demographic columns directly on the dependent
ALTER TABLE patient_dependent ADD COLUMN first_name VARCHAR(80) NOT NULL DEFAULT '';
ALTER TABLE patient_dependent ADD COLUMN last_name  VARCHAR(80) NOT NULL DEFAULT '';
ALTER TABLE patient_dependent ADD COLUMN middle_name VARCHAR(80);
ALTER TABLE patient_dependent ADD COLUMN suffix VARCHAR(10);
ALTER TABLE patient_dependent ADD COLUMN dob DATE NOT NULL DEFAULT CURRENT_DATE;
ALTER TABLE patient_dependent ADD COLUMN sex CHAR(1) NOT NULL DEFAULT 'M';

-- Remove the temporary defaults (they were only needed during migration)
ALTER TABLE patient_dependent ALTER COLUMN first_name DROP DEFAULT;
ALTER TABLE patient_dependent ALTER COLUMN last_name DROP DEFAULT;
ALTER TABLE patient_dependent ALTER COLUMN dob DROP DEFAULT;
ALTER TABLE patient_dependent ALTER COLUMN sex DROP DEFAULT;
