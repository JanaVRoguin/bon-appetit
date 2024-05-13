package com.bonappetit.bonappetitApi.dto.entrada;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RecetaEntradaDto {
    private String nombre;
    private String descripcion;
    private String ingredientes;
    private String instrucciones;
    private List<Long> categorias;
    private List<Long> imagenes;

}
