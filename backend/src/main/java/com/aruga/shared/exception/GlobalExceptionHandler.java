package com.aruga.shared.exception;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import java.util.Map;

@Provider
public class GlobalExceptionHandler implements ExceptionMapper<EhmsBusinessException> {

    @Override
    public Response toResponse(EhmsBusinessException exception) {
        return Response.status(exception.getStatus())
                .entity(Map.of(
                        "status", exception.getStatus().getStatusCode(),
                        "error", exception.getStatus().getReasonPhrase(),
                        "message", exception.getMessage()
                ))
                .build();
    }
}
