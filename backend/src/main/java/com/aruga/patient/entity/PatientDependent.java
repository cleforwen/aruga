package com.aruga.patient.entity;

import io.quarkus.hibernate.reactive.panache.PanacheEntityBase;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "patient_dependent")
public class PatientDependent extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dependent_id")
    public Long dependentId;

    @Column(name = "principal_patient_id", length = 20, nullable = false)
    public String principalPatientId;

    @Column(name = "first_name", length = 80, nullable = false)
    public String firstName;

    @Column(name = "last_name", length = 80, nullable = false)
    public String lastName;

    @Column(name = "middle_name", length = 80)
    public String middleName;

    @Column(length = 10)
    public String suffix;

    @Column(nullable = false)
    public LocalDate dob;

    @Column(length = 1, nullable = false)
    public String sex;

    @Column(length = 30, nullable = false)
    public String relationship;

    @Column(name = "supporting_doc_type", length = 50, nullable = false)
    public String supportingDocType;

    @Column(name = "supporting_doc_ref", length = 100)
    public String supportingDocRef;

    @Column(name = "date_registered", nullable = false)
    public LocalDate dateRegistered;

    @Column(name = "is_valid")
    public Boolean isValid = true;
}
