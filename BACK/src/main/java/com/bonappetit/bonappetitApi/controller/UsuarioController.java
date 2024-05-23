package com.bonappetit.bonappetitApi.controller;

import com.bonappetit.bonappetitApi.entity.Usuario;
import com.bonappetit.bonappetitApi.service.IUsuarioService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    @Autowired
    IUsuarioService iUsuarioService;
    @GetMapping("/listar")
    public ResponseEntity<List<Usuario>> listarUsuarios(){
        List<Usuario> listarImagenes = iUsuarioService.findAll();
        return new ResponseEntity<>(listarImagenes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarUsuario(@PathVariable Long id){
        return new ResponseEntity<>(iUsuarioService.findById(id),HttpStatus.OK);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarUsuario(@PathVariable Long id){
        iUsuarioService.deleteById(id);
        return new ResponseEntity<>("Usuario eliminado", HttpStatus.OK) ;
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        iUsuarioService.logout(request);
        return ResponseEntity.ok("Cierre de sesión exitoso");
    }
}
