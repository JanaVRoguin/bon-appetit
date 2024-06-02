package com.bonappetit.bonappetitApi.dto.salida.Jwt;


public class JWTResponse {
    private String token;
    private String nombre;
    private String rol;
    private String correo;

    public JWTResponse(String token, String nombre, String rol, String correo) {
        this.token = token;
        this.nombre = nombre;
        this.rol = rol;
        this.correo = correo;
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

    public String getCorreo() {
        return correo;
    }
}
