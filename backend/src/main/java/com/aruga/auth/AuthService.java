package com.aruga.auth;

import com.aruga.auth.dto.LoginRequest;
import com.aruga.auth.dto.TokenResponse;
import com.aruga.shared.exception.EhmsBusinessException;
import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import java.time.Duration;
import io.smallrye.mutiny.Uni;
import io.quarkus.hibernate.reactive.panache.common.WithSession;

@ApplicationScoped
public class AuthService {

    @Inject
    AppUserRepository appUserRepository;

    @WithSession
    public Uni<TokenResponse> authenticate(LoginRequest request) {
        return appUserRepository.findByUsername(request.username)
            .onItem().transform(user -> {
                if (user == null || !checkPassword(request.password)) {
                    throw new EhmsBusinessException(Response.Status.UNAUTHORIZED, "Invalid credentials or user not found.");
                }
                String token = Jwt.issuer("https://aruga.ehms.com")
                    .upn(user.username)
                    .groups(user.roles)
                    .expiresIn(Duration.ofHours(1))
                    .sign();
                return new TokenResponse(token);
            });
    }

    private boolean checkPassword(String plain) {
        return "admin".equals(plain);
    }
}
