package com.bonappetit.bonappetitApi.service;

import com.bonappetit.bonappetitApi.entity.Categoria;
import com.bonappetit.bonappetitApi.entity.Receta;

import java.util.List;

public interface ICategoriaService {

    public Categoria crearCategoria(Categoria categoria);

    public List<Categoria> listarCategorias();
    public Categoria buscarCategoria(Long id);
    public void eliminarCategoria(Long id);
}
