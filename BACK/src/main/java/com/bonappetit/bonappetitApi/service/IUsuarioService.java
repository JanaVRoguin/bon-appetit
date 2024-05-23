package com.bonappetit.bonappetitApi.service;

import com.bonappetit.bonappetitApi.entity.Usuario;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;


public interface IUsuarioService {

    public Usuario registerUser(Usuario usuario);
    public List<Usuario> findAll();
    public void deleteById(Long id);
    public Usuario findById(Long id);
    public void grantAdminRole(Long id);
    public void revokeAdminRole(Long id);
    public void logout(HttpServletRequest request);
}
