package com.bonappetit.bonappetitApi.service.impl;

import com.bonappetit.bonappetitApi.entity.Categoria;
import com.bonappetit.bonappetitApi.repository.ICategoriaRepository;
import com.bonappetit.bonappetitApi.service.ICategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CategoriaService implements ICategoriaService {

    @Autowired
    ICategoriaRepository iCategoriaRepository;
    @Override
    public Categoria crearCategoria(Categoria categoria) {
        return iCategoriaRepository.save(categoria);
    }

    @Override
    public List<Categoria> listarCategorias() {
        List<Categoria> listarCategorias = iCategoriaRepository.findAll();
        return listarCategorias;
    }

    @Override
    public Categoria buscarCategoria(Long id) {
        return iCategoriaRepository.findById(id).orElse(null);
    }

    @Override
    public void eliminarCategoria(Long id) {
        iCategoriaRepository.deleteById(id);
    }


}
