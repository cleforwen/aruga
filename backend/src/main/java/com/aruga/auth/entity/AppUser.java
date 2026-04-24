package com.aruga.auth.entity;

import io.quarkus.hibernate.reactive.panache.PanacheEntity;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import io.smallrye.mutiny.Uni;

@Entity
@Table(name = "app_user")
public class AppUser extends PanacheEntity {

    @Column(unique = true, nullable = false, length = 50)
    public String username;

    @Column(name = "password_hash", nullable = false)
    public String passwordHash;

    @Column(nullable = false)
    public String roles;

    @Column(name = "created_at", nullable = false, updatable = false)
    public LocalDateTime createdAt = LocalDateTime.now();

}
