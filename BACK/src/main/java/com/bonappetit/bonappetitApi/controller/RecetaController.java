package com.bonappetit.bonappetitApi.controller;

import com.bonappetit.bonappetitApi.dto.entrada.RecetaEntradaDto;

import com.bonappetit.bonappetitApi.entity.Receta;
import com.bonappetit.bonappetitApi.service.IRecetaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/recetas")
@CrossOrigin
public class RecetaController {

    @Autowired
    IRecetaService iRecetaService;

    @PostMapping("/crear")
    public ResponseEntity<String> crearReceta(@RequestBody @Valid RecetaEntradaDto receta){
        iRecetaService.crearReceta(receta);
        return new ResponseEntity<>("Receta creada", HttpStatus.CREATED);
    }
    @GetMapping("/listar")
    public ResponseEntity<List<Receta>> listarRecetas(){
        List<Receta> listarRecetas = iRecetaService.listarRecetas();
        return new ResponseEntity<>(listarRecetas,HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Receta> buscarReceta(@PathVariable Long id){
        return new ResponseEntity<>(iRecetaService.buscarReceta(id), HttpStatus.OK);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<String> actualizarReceta(@PathVariable Long id, @RequestBody @Valid RecetaEntradaDto receta) {
        iRecetaService.actualizarReceta(id, receta);
        return new ResponseEntity<>("Receta actualizada", HttpStatus.OK);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarReceta(@PathVariable Long id){
        iRecetaService.eliminarReceta(id);
        return new ResponseEntity<>("Receta eliminada", HttpStatus.OK) ;
    }
}
