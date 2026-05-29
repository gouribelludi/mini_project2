package com.neuropain.care.dto;



public class AuthResponse {
    private String status;
    private String message;
    private String email;
    private String name;

    public AuthResponse(String status, String message, String email, String name) {
        this.status = status;
        this.message = message;
        this.email = email;
        this.name = name;
    }

    public String getStatus() { return status; }
    public String getMessage() { return message; }
    public String getEmail() { return email; }
    public String getName() { return name; }
}

