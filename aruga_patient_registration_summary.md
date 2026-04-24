# ARUGA Hospital System

## Module 01: Patient Registration & PhilHealth Verification

------------------------------------------------------------------------

## 1. Overview

This module is the entry point for all patients. It handles: - Patient
demographic capture - PhilHealth membership verification via PHICS API -
Dependent validation - Pre-assessment of benefit eligibility

------------------------------------------------------------------------

## 2. Key Features

-   Real-time PhilHealth eligibility checking
-   Member Data Record (MDR) capture
-   Dependent verification (PSA documents)
-   Unique Patient ID (UPI) generation
-   Duplicate detection and merging
-   Support for OPD, inpatient, ER workflows
-   Integration with NHIP data

------------------------------------------------------------------------

## 3. Core Data Entities

### Patient

Stores demographic and contact details: - Patient ID (unique) -
PhilHealth number - Name, DOB, sex, civil status - Address and contact
info - Membership category and benefit status

### PhilHealth Eligibility Log

Tracks all eligibility queries: - Query type and timestamp - Member
status (ACTIVE, INACTIVE, etc.) - Contribution months - API responses
and logs

### Patient Dependent

Links dependents to principal members: - Relationship (spouse, child,
parent) - Supporting documents (PSA) - Validation status

------------------------------------------------------------------------

## 4. Relationships

-   One patient → many eligibility logs
-   One patient → many dependents
-   Dependents linked to one principal
-   Users create patient records

------------------------------------------------------------------------

## 5. Process Flow

1.  **Patient Identification**
    -   Check existing records or create new
2.  **Data Capture**
    -   Collect demographics and IDs
3.  **PhilHealth Verification**
    -   Call PHICS API for eligibility
4.  **Dependent Validation**
    -   Verify documents and link records
5.  **UPI Assignment**
    -   Generate unique patient ID
6.  **Benefit Pre-Assessment**
    -   Determine applicable benefits
7.  **Approval**
    -   Supervisor validates PhilHealth cases

------------------------------------------------------------------------

## 6. Business Rules

-   PIN required for PhilHealth claims
-   Eligibility must be checked on service date
-   Dependents must link to principal member
-   Inactive members marked as self-paying
-   All queries must be logged for audit

------------------------------------------------------------------------

## 7. System Integrations

-   **PHICS API** -- Eligibility verification
-   **PhilSys** -- National ID validation
-   **DOH FHIMS** -- Reporting
-   **PSA Registry** -- Document validation
-   **Billing Module** -- Benefit deductions
-   **Admission & OPD Modules** -- Patient routing
-   **Audit Module** -- Activity tracking

------------------------------------------------------------------------

## Summary

The ARUGA Patient Registration Module ensures accurate patient data
capture, real-time PhilHealth validation, and proper eligibility
assessment before care delivery, enabling efficient billing and
compliance.
