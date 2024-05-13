package com.bonappetit.bonappetitApi.service;

import com.bonappetit.bonappetitApi.entity.Categoria;
import com.bonappetit.bonappetitApi.entity.Imagen;

import java.util.List;

public interface IImagenService {
    public Imagen crearImagen(Imagen imagen);
    public List<Imagen> listarImagenes();
    public Imagen buscarImagen(Long id);
    public void eliminarImagen(Long id);
}
