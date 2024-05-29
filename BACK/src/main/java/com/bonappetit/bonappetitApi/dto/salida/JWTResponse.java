package com.bonappetit.bonappetitApi.dto.salida;


public class JWTResponse {
    private String token;
    private String nombre;
    private String rol;

    public JWTResponse(String token, String nombre, String rol) {
        this.token = token;
        this.nombre = nombre;
        this.rol = rol;
    }

    // Getters
    public String getToken() {
        return token;
    }

    public String getNombre() {
        return nombre;
    }

    public String getRol() {
        return rol;
    }
}
