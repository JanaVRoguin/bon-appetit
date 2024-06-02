package com.bonappetit.bonappetitApi.controller;

import com.bonappetit.bonappetitApi.security.jwt.JWTUtil;
import com.bonappetit.bonappetitApi.dto.entrada.LoginRequest;
import com.bonappetit.bonappetitApi.dto.salida.Jwt.JWTResponse;
import com.bonappetit.bonappetitApi.entity.*;
import com.bonappetit.bonappetitApi.service.impl.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {
    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JWTUtil jwtUtil;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/registro")
    public ResponseEntity<?> registerUser(@RequestBody Usuario usuario) {
        try {
            Usuario registrado = usuarioService.registerUser(usuario);
            return ResponseEntity.ok("Usuario registrado con éxito");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getCorreo(), loginRequest.getContraseña()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtil.generateToken(authentication);

            // Obtener el usuario y sus detalles
            Usuario usuario = usuarioService.findByCorreo(loginRequest.getCorreo());
            String nombre = usuario.getNombre();
            String rol = usuario.getRoles().stream().findFirst().get().getRoleEnum().toString();
            String correo = usuario.getCorreo();

            return ResponseEntity.ok(new JWTResponse(jwt, nombre, rol, correo));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
    }

}
