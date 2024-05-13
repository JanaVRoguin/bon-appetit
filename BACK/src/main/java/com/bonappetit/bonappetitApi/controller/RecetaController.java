package com.bonappetit.bonappetitApi.controller;

import com.bonappetit.bonappetitApi.dto.entrada.RecetaEntradaDto;
import com.bonappetit.bonappetitApi.dto.salida.RecetaSalidaDto;
import com.bonappetit.bonappetitApi.entity.Receta;
import com.bonappetit.bonappetitApi.service.IRecetaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recetas")
@CrossOrigin
public class RecetaController {

    @Autowired
    IRecetaService iRecetaService;

    @PostMapping("/crear")
    public ResponseEntity<String> crearReceta(@RequestBody RecetaEntradaDto receta){
        iRecetaService.crearReceta(receta);
        return new ResponseEntity<>("Receta creada", HttpStatus.CREATED);
    }
    @GetMapping("/listar")
    public ResponseEntity<List<Receta>> listarRecetas(){
        List<Receta> listarRecetas = iRecetaService.listarRecetas();
        return new ResponseEntity<>(listarRecetas,HttpStatus.OK);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarReceta(@PathVariable Long id){
        iRecetaService.eliminarReceta(id);
        return new ResponseEntity<>("Receta eliminada", HttpStatus.OK) ;
    }
}
