package com.aruga.patient.entity;

import io.quarkus.hibernate.reactive.panache.PanacheEntityBase;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "patient")
public class Patient extends PanacheEntityBase {
    
    @Id
    @Column(name = "patient_id", length = 20)
    public String patientId;

    @Column(name = "philhealth_no", length = 12, unique = true, nullable = true)
    public String philhealthNo;

    @Column(name = "last_name", length = 80, nullable = false)
    public String lastName;

    @Column(name = "first_name", length = 80, nullable = false)
    public String firstName;

    @Column(name = "middle_name", length = 80)
    public String middleName;

    @Column(length = 10)
    public String suffix;

    @Column(nullable = false)
    public LocalDate dob;

    @Column(length = 1, nullable = false)
    public String sex;

    @Column(name = "civil_status", length = 15, nullable = false)
    public String civilStatus;

    @Column(length = 50)
    public String nationality = "Filipino";

    @Column(name = "address_line1", length = 150)
    public String addressLine1;

    @Column(length = 80)
    public String barangay;

    @Column(length = 80)
    public String municipality;

    @Column(length = 80)
    public String province;

    @Column(name = "region_code", length = 10, nullable = false)
    public String regionCode;

    @Column(name = "contact_mobile", length = 15, nullable = false)
    public String contactMobile;

    @Column(name = "contact_email", length = 120)
    public String contactEmail;

    @Column(name = "emergency_contact_name", length = 100, nullable = false)
    public String emergencyContactName;

    @Column(name = "emergency_contact_rel", length = 50, nullable = false)
    public String emergencyContactRel;

    @Column(name = "emergency_contact_no", length = 15, nullable = false)
    public String emergencyContactNo;

    @Column(name = "membership_category", length = 30)
    public String membershipCategory;

    @Column(name = "ph_benefit_status", length = 20)
    public String phBenefitStatus = "PENDING";

    @Column(name = "created_by", nullable = false)
    public Integer createdBy;

    @Column(name = "created_at", nullable = false, updatable = false)
    public LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    public LocalDateTime updatedAt = LocalDateTime.now();

    @Column(name = "is_active")
    public Boolean isActive = true;
}
