package com.bonappetit.bonappetitApi.controller;

import com.bonappetit.bonappetitApi.entity.Categoria;
import com.bonappetit.bonappetitApi.entity.Imagen;
import com.bonappetit.bonappetitApi.service.IImagenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/imagenes")
@CrossOrigin
public class ImagenController {

    @Autowired
    IImagenService iImagenService;

    @PostMapping("/crear")
    public ResponseEntity<String> crarImagen(@RequestBody Imagen imagen){
        iImagenService.crearImagen(imagen);
        return new ResponseEntity<>("Imagen creada", HttpStatus.CREATED);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Imagen>> listarCategorias(){
        List<Imagen> listarImagenes = iImagenService.listarImagenes();
        return new ResponseEntity<>(listarImagenes,HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Imagen> buscarImagen(@PathVariable Long id){
        return new ResponseEntity<>(iImagenService.buscarImagen(id),HttpStatus.OK);
    }
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarImagen(@PathVariable Long id){
        iImagenService.eliminarImagen(id);
        return new ResponseEntity<>("Imagen eliminada", HttpStatus.OK) ;
    }
}
