package com.bonappetit.bonappetitApi.dto.salida;


public class JWTResponse {
    private String token;

    public JWTResponse(String token) {
        this.token = token;
    }

    // Getter
    public String getToken() {
        return token;
    }
}