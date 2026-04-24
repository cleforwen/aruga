-- liquibase formatted sql

-- changeset aruga:2
CREATE TABLE app_user (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    roles VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Admin password is 'admin' (BCrypt hashed)
INSERT INTO app_user (username, password_hash, roles) 
VALUES ('admin', '$2a$10$e.wXqH1.x4XlK.22B13N6ONL2s/Hl5aK9bFw29yD8gNpxK6mJ5n9O', 'ADMIN');
