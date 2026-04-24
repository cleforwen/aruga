package com.aruga.patient;

import com.aruga.patient.entity.PatientDependent;
import io.quarkus.hibernate.reactive.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PatientDependentRepository implements PanacheRepository<PatientDependent> {
}
