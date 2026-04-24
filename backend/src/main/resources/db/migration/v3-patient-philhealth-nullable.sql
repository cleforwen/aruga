-- Allow null philhealth_no (unique constraint only applies to non-null values)
ALTER TABLE patient ALTER COLUMN philhealth_no DROP NOT NULL;
