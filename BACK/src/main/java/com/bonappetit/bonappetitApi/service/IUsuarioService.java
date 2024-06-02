package com.bonappetit.bonappetitApi.service;

import com.bonappetit.bonappetitApi.dto.salida.Usuario.UsuarioActualizarDto;
import com.bonappetit.bonappetitApi.dto.salida.Usuario.UsuarioSalidaDto;
import com.bonappetit.bonappetitApi.entity.Usuario;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;


public interface IUsuarioService {

    public Usuario registerUser(Usuario usuario);
    public List<UsuarioSalidaDto> listarUsuarios();
    public void deleteById(Long id);
    public UsuarioSalidaDto buscarUsuario(Long id);
    public  UsuarioSalidaDto actualizarUsuario(UsuarioActualizarDto usuario);
    public void grantAdminRole(Long id);
    public void revokeAdminRole(Long id);
    public void logout(HttpServletRequest request);
    public Usuario findByCorreo(String correo);
}
