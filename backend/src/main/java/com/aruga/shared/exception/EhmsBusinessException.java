package com.aruga.shared.exception;

import jakarta.ws.rs.core.Response.Status;

public class EhmsBusinessException extends RuntimeException {
    private final Status status;

    public EhmsBusinessException(Status status, String message) {
        super(message);
        this.status = status;
    }

    public Status getStatus() {
        return status;
    }
}
