
-- ARUGA Hospital System
-- Module 01: Patient Registration & PhilHealth Verification
-- SQL Schema (Data Types & Constraints)

CREATE TABLE patient (
    patient_id VARCHAR(20) PRIMARY KEY,
    philhealth_no VARCHAR(12) UNIQUE,
    last_name VARCHAR(80) NOT NULL,
    first_name VARCHAR(80) NOT NULL,
    middle_name VARCHAR(80),
    suffix VARCHAR(10),
    dob DATE NOT NULL,
    sex CHAR(1) NOT NULL CHECK (sex IN ('M','F')),
    civil_status VARCHAR(15) NOT NULL,
    nationality VARCHAR(50) DEFAULT 'Filipino',
    address_line1 VARCHAR(150) NOT NULL,
    barangay VARCHAR(80) NOT NULL,
    municipality VARCHAR(80) NOT NULL,
    province VARCHAR(80) NOT NULL,
    region_code VARCHAR(10) NOT NULL,
    contact_mobile VARCHAR(15) NOT NULL,
    contact_email VARCHAR(120),
    emergency_contact_name VARCHAR(100) NOT NULL,
    emergency_contact_rel VARCHAR(50) NOT NULL,
    emergency_contact_no VARCHAR(15) NOT NULL,
    membership_category VARCHAR(30),
    ph_benefit_status VARCHAR(20) DEFAULT 'PENDING',
    created_by INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE philhealth_eligibility_log (
    log_id BIGSERIAL PRIMARY KEY,
    patient_id VARCHAR(20) NOT NULL,
    query_type VARCHAR(30) NOT NULL,
    phic_transaction_no VARCHAR(50),
    query_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    pin_verified VARCHAR(12),
    member_status VARCHAR(20) NOT NULL,
    contribution_months INT,
    benefit_year INT,
    eligibility_result TEXT,
    verified_by INT,
    api_response_code VARCHAR(10),
    remarks TEXT,
    CONSTRAINT fk_patient
        FOREIGN KEY(patient_id)
        REFERENCES patient(patient_id)
);

CREATE TABLE patient_dependent (
    dependent_id SERIAL PRIMARY KEY,
    principal_patient_id VARCHAR(20) NOT NULL,
    dependent_patient_id VARCHAR(20) NOT NULL,
    relationship VARCHAR(30) NOT NULL,
    supporting_doc_type VARCHAR(50) NOT NULL,
    supporting_doc_ref VARCHAR(100),
    date_registered DATE NOT NULL,
    is_valid BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_principal
        FOREIGN KEY(principal_patient_id)
        REFERENCES patient(patient_id),
    CONSTRAINT fk_dependent
        FOREIGN KEY(dependent_patient_id)
        REFERENCES patient(patient_id)
);

-- Indexes
CREATE INDEX idx_patient_philhealth_no ON patient(philhealth_no);
CREATE INDEX idx_patient_name_dob ON patient(last_name, dob, sex);
CREATE INDEX idx_eligibility_patient_id ON philhealth_eligibility_log(patient_id);
CREATE INDEX idx_dependent_principal ON patient_dependent(principal_patient_id);
