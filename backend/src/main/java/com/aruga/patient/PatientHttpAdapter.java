package com.aruga.patient;

import com.aruga.patient.entity.Patient;
import com.aruga.patient.entity.PatientDependent;
import com.aruga.patient.entity.PhilhealthEligibilityLog;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import io.smallrye.mutiny.Uni;
import java.util.List;

@Path("/api/v1/patients")
@ApplicationScoped
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PatientHttpAdapter {

    @Inject
    PatientService patientService;

    @GET
    @RolesAllowed("ADMIN")
    public Uni<List<Patient>> getPatients() {
        return patientService.getAllPatients();
    }

    @POST
    @RolesAllowed("ADMIN")
    public Uni<Patient> createPatient(Patient patient) {
        return patientService.createPatient(patient);
    }

    @GET
    @Path("/{id}")
    @RolesAllowed("ADMIN")
    public Uni<Patient> getPatient(@PathParam("id") String id) {
        return patientService.getPatient(id);
    }

    @PUT
    @Path("/{id}")
    @RolesAllowed("ADMIN")
    public Uni<Patient> updatePatient(@PathParam("id") String id, Patient patient) {
        return patientService.updatePatient(id, patient);
    }

    @GET
    @Path("/{id}/dependents")
    @RolesAllowed("ADMIN")
    public Uni<List<PatientDependent>> getDependents(@PathParam("id") String id) {
        return patientService.getDependents(id);
    }

    @POST
    @Path("/{id}/dependents")
    @RolesAllowed("ADMIN")
    public Uni<PatientDependent> addDependent(@PathParam("id") String id, PatientDependentInput input) {
        return patientService.addDependent(id, input);
    }

    @GET
    @Path("/{id}/eligibility")
    @RolesAllowed("ADMIN")
    public Uni<List<PhilhealthEligibilityLog>> getEligibilityLogs(@PathParam("id") String id) {
        return patientService.getEligibilityLogs(id);
    }

    @POST
    @Path("/{id}/eligibility")
    @RolesAllowed("ADMIN")
    public Uni<PhilhealthEligibilityLog> addEligibilityLog(@PathParam("id") String id, PhilhealthEligibilityLog log) {
        return patientService.addEligibilityLog(id, log);
    }
}
