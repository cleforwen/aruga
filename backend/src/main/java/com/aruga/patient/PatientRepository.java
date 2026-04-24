package com.aruga.patient;

import com.aruga.patient.entity.Patient;
import io.quarkus.hibernate.reactive.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PatientRepository implements PanacheRepositoryBase<Patient, String> {
}
