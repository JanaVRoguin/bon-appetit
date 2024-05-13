package com.bonappetit.bonappetitApi.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class Receta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String descripcion;
    private String ingredientes;
    private String instrucciones;
    @ManyToMany
    private List<Categoria> categorias;
    @OneToMany
    private List<Imagen> imagenes;
    /* AGREGAR LA FUNCIONALIDAD DE IMAGENES EN EL DTO Y SERVICIO Y TODO LO FUCKING DE MAS */
}
