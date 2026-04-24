package com.aruga.auth;

import com.aruga.auth.entity.AppUser;
import io.quarkus.hibernate.reactive.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import io.smallrye.mutiny.Uni;

@ApplicationScoped
public class AppUserRepository implements PanacheRepository<AppUser> {
    
    public Uni<AppUser> findByUsername(String username) {
        return find("username", username).firstResult();
    }
}
