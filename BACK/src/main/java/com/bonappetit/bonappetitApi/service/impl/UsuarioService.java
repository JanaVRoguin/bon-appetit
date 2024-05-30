package com.bonappetit.bonappetitApi.service.impl;

import com.bonappetit.bonappetitApi.entity.Role;
import com.bonappetit.bonappetitApi.entity.RoleEnum;
import com.bonappetit.bonappetitApi.entity.Usuario;
import com.bonappetit.bonappetitApi.repository.IUsuarioRepository;
import com.bonappetit.bonappetitApi.security.jwt.JWTUtil;
import com.bonappetit.bonappetitApi.service.IUsuarioService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService implements IUsuarioService {

    @Autowired
    private IUsuarioRepository iUsuarioRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JWTUtil jwtUtil;
    @Override
    public Usuario registerUser(Usuario usuario) {
        if (iUsuarioRepository.findUsuarioByCorreo(usuario.getCorreo()).isPresent()) {
            throw new IllegalArgumentException("El correo ya está en uso");
        }

        usuario.setContraseña(passwordEncoder.encode(usuario.getContraseña()));

        // Asigna el rol por defecto 'USER'
        Role userRole = new Role();
        userRole.setRoleEnum(RoleEnum.USER);
        usuario.getRoles().add(userRole);

        return iUsuarioRepository.save(usuario);
    }

    public void grantAdminRole(Long id) {
        Usuario usuario = iUsuarioRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        // Buscar el rol actual del usuario
        Optional<Role> userRoleOptional = usuario.getRoles().stream()
                .filter(role -> role.getRoleEnum() == RoleEnum.USER)
                .findFirst();

        if (userRoleOptional.isPresent()) {
            // Si el usuario tiene el rol de USER, cambiarlo a ADMIN
            Role userRole = userRoleOptional.get();
            userRole.setRoleEnum(RoleEnum.ADMIN);
            iUsuarioRepository.save(usuario);
        } else if (usuario.getRoles().stream().anyMatch(role -> role.getRoleEnum() == RoleEnum.ADMIN)) {
            // Si el usuario ya tiene el rol de ADMIN, lanzar una excepción
            throw new IllegalArgumentException("El usuario ya tiene el rol de ADMIN");
        } else {
            // Si el usuario no tiene el rol de USER ni el rol de ADMIN, lanzar una excepción
            throw new IllegalArgumentException("El usuario no tiene un rol válido para cambiar a ADMIN");
        }
    }

    public void revokeAdminRole(Long id) {
        Usuario usuario = iUsuarioRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        // Buscar el rol de ADMIN del usuario
        Optional<Role> adminRoleOptional = usuario.getRoles().stream()
                .filter(role -> role.getRoleEnum() == RoleEnum.ADMIN)
                .findFirst();

        if (adminRoleOptional.isPresent()) {
            // Si el usuario tiene el rol de ADMIN, cambiarlo a USER
            Role adminRole = adminRoleOptional.get();
            adminRole.setRoleEnum(RoleEnum.USER);
            iUsuarioRepository.save(usuario);
        } else {
            // Si el usuario no tiene el rol de ADMIN, lanzar una excepción
            throw new IllegalArgumentException("El usuario no tiene el rol de ADMIN");
        }
    }


    public void logout(HttpServletRequest request) {
        String token = extractTokenFromRequest(request);
    }

    private String extractTokenFromRequest(HttpServletRequest request) {
        final String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7); // "Bearer " tiene 7 caracteres
        }

        return null;
    }
    @Override
    public Usuario findByCorreo(String correo) {
        return iUsuarioRepository.findUsuarioByCorreo(correo)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con el correo: " + correo));
    }
    @Override
    public List<Usuario> findAll() {
        return iUsuarioRepository.findAll();
    }

    @Override
    public void deleteById(Long id) {
        iUsuarioRepository.deleteById(id);
    }

    @Override
    public Usuario findById(Long id) {
        return iUsuarioRepository.findById(id).orElse(null);
    }
}
