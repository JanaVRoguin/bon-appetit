package com.bonappetit.bonappetitApi.service.impl;

import com.bonappetit.bonappetitApi.entity.Imagen;
import com.bonappetit.bonappetitApi.repository.IImagenRepository;
import com.bonappetit.bonappetitApi.service.IImagenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImagenService implements IImagenService {

    @Autowired
    IImagenRepository iImagenRepository;

    @Override
    public Imagen crearImagen(Imagen imagen) {
        return iImagenRepository.save(imagen);
    }

    @Override
    public List<Imagen> listarImagenes() {
        List<Imagen> listarImagenes = iImagenRepository.findAll();
        return listarImagenes;
    }

    @Override
    public Imagen buscarImagen(Long id) {
        return iImagenRepository.findById(id).orElse(null);
    }

    @Override
    public void eliminarImagen(Long id) {
        iImagenRepository.deleteById(id);
    }
}
