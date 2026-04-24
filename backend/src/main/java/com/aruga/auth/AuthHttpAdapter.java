package com.aruga.auth;

import com.aruga.auth.dto.LoginRequest;
import com.aruga.auth.dto.TokenResponse;
import jakarta.annotation.security.PermitAll;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import io.smallrye.mutiny.Uni;

@Path("/api/v1/auth")
@ApplicationScoped
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthHttpAdapter {

    @Inject
    AuthService authService;

    @POST
    @Path("/login")
    @PermitAll
    public Uni<TokenResponse> login(LoginRequest request) {
        return authService.authenticate(request);
    }
}
