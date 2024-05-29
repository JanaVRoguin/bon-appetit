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

        // Verificar si el usuario ya tiene el rol de ADMIN
        boolean isAdmin = usuario.getRoles().stream()
                .anyMatch(role -> role.getRoleEnum() == RoleEnum.ADMIN);

        if (!isAdmin) {
            // Si el usuario no tiene el rol de ADMIN, asignarlo
            Role adminRole = new Role();
            adminRole.setRoleEnum(RoleEnum.ADMIN);
            usuario.getRoles().add(adminRole);
            iUsuarioRepository.save(usuario);
        } else {
            throw new IllegalArgumentException("El usuario ya tiene el rol de ADMIN");
        }
    }

    public void revokeAdminRole(Long id) {
        Usuario usuario = iUsuarioRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        // Verificar si el usuario tiene el rol de ADMIN
        boolean isAdmin = usuario.getRoles().removeIf(role -> role.getRoleEnum() == RoleEnum.ADMIN);

        if (isAdmin) {
            iUsuarioRepository.save(usuario);
        } else {
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
