package com.aruga.patient;

import com.aruga.patient.entity.Patient;
import com.aruga.patient.entity.PatientDependent;
import com.aruga.patient.entity.PhilhealthEligibilityLog;
import io.quarkus.hibernate.reactive.panache.common.WithSession;
import io.quarkus.hibernate.reactive.panache.common.WithTransaction;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.time.LocalDateTime;
import java.util.List;

@ApplicationScoped

public class PatientService {

    @Inject
    PatientRepository patientRepository;

    @Inject
    PatientDependentRepository patientDependentRepository;

    @WithSession
    public Uni<List<Patient>> getAllPatients() {
        return patientRepository.listAll();
    }

    @WithSession
    public Uni<Patient> getPatient(String id) {
        return patientRepository.findById(id);
    }

    @WithTransaction
    public Uni<Patient> createPatient(Patient patient) {
        if (patient.patientId == null || patient.patientId.isEmpty()) {
            patient.patientId = "PT-" + System.currentTimeMillis();
        }
        if (patient.philhealthNo != null && patient.philhealthNo.isEmpty()) {
            patient.philhealthNo = null;
        }
        if (patient.regionCode == null || patient.regionCode.isEmpty()) {
            patient.regionCode = "R1";
        }
        if (patient.contactMobile == null || patient.contactMobile.isEmpty()) {
            patient.contactMobile = "TBD";
        }
        if (patient.emergencyContactName == null || patient.emergencyContactName.isEmpty()) {
            patient.emergencyContactName = "TBD";
        }
        if (patient.emergencyContactRel == null || patient.emergencyContactRel.isEmpty()) {
            patient.emergencyContactRel = "TBD";
        }
        if (patient.emergencyContactNo == null || patient.emergencyContactNo.isEmpty()) {
            patient.emergencyContactNo = "TBD";
        }
        return patientRepository.persist(patient);
    }

    @WithTransaction
    public Uni<Patient> updatePatient(String id, Patient updated) {
        return patientRepository.findById(id).onItem().ifNotNull().call(existing -> {
            existing.firstName = updated.firstName;
            existing.lastName = updated.lastName;
            existing.middleName = updated.middleName;
            existing.suffix = updated.suffix;
            existing.dob = updated.dob;
            existing.sex = updated.sex;
            existing.civilStatus = updated.civilStatus;
            existing.nationality = updated.nationality;
            existing.addressLine1 = updated.addressLine1;
            existing.barangay = updated.barangay;
            existing.municipality = updated.municipality;
            existing.province = updated.province;
            existing.regionCode = updated.regionCode;
            existing.contactMobile = updated.contactMobile;
            existing.contactEmail = updated.contactEmail;
            existing.emergencyContactName = updated.emergencyContactName;
            existing.emergencyContactRel = updated.emergencyContactRel;
            existing.emergencyContactNo = updated.emergencyContactNo;
            if (updated.philhealthNo != null && !updated.philhealthNo.isEmpty()) {
                existing.philhealthNo = updated.philhealthNo;
            } else {
                existing.philhealthNo = null;
            }
            existing.updatedAt = LocalDateTime.now();
            return existing.persist();
        });
    }

    @WithSession
    public Uni<List<PatientDependent>> getDependents(String patientId) {
        return patientDependentRepository.find("principalPatientId", patientId).list();
    }

    @WithTransaction
    public Uni<PatientDependent> addDependent(String patientId, PatientDependentInput input) {
        PatientDependent dep = new PatientDependent();
        dep.principalPatientId = patientId;
        dep.firstName = input.firstName;
        dep.lastName = input.lastName;
        dep.middleName = input.middleName;
        dep.suffix = input.suffix;
        dep.dob = input.dob;
        dep.sex = input.sex;
        dep.relationship = input.relationship;
        dep.supportingDocType = input.supportingDocType;
        dep.supportingDocRef = input.supportingDocRef;
        dep.dateRegistered = java.time.LocalDate.now();
        dep.isValid = true;
        return patientDependentRepository.persist(dep);
    }

    @WithSession
    public Uni<List<PhilhealthEligibilityLog>> getEligibilityLogs(String patientId) {
        return PhilhealthEligibilityLog.find("patientId", patientId).list();
    }

    @WithTransaction
    public Uni<PhilhealthEligibilityLog> addEligibilityLog(String patientId, PhilhealthEligibilityLog log) {
        log.patientId = patientId;
        return log.persist();
    }
}
