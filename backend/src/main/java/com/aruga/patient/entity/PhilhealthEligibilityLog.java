package com.aruga.patient.entity;

import io.quarkus.hibernate.reactive.panache.PanacheEntityBase;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "philhealth_eligibility_log")
public class PhilhealthEligibilityLog extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id")
    public Long logId;

    @Column(name = "patient_id", length = 20, nullable = false)
    public String patientId;

    @Column(name = "query_type", length = 30, nullable = false)
    public String queryType;

    @Column(name = "phic_transaction_no", length = 50)
    public String phicTransactionNo;

    @Column(name = "query_date", nullable = false)
    public LocalDateTime queryDate = LocalDateTime.now();

    @Column(name = "pin_verified", length = 12)
    public String pinVerified;

    @Column(name = "member_status", length = 20, nullable = false)
    public String memberStatus;

    @Column(name = "contribution_months")
    public Integer contributionMonths;

    @Column(name = "benefit_year")
    public Integer benefitYear;

    @Column(name = "eligibility_result", columnDefinition = "TEXT")
    public String eligibilityResult;

    @Column(name = "verified_by")
    public Integer verifiedBy;

    @Column(name = "api_response_code", length = 10)
    public String apiResponseCode;

    @Column(columnDefinition = "TEXT")
    public String remarks;
}
