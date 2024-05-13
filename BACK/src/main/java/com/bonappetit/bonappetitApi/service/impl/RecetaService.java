package com.bonappetit.bonappetitApi.service.impl;

import com.bonappetit.bonappetitApi.dto.entrada.RecetaEntradaDto;
import com.bonappetit.bonappetitApi.dto.salida.RecetaSalidaDto;
import com.bonappetit.bonappetitApi.entity.Categoria;
import com.bonappetit.bonappetitApi.entity.Imagen;
import com.bonappetit.bonappetitApi.entity.Receta;
import com.bonappetit.bonappetitApi.repository.ICategoriaRepository;
import com.bonappetit.bonappetitApi.repository.IImagenRepository;
import com.bonappetit.bonappetitApi.repository.IRecetaRepository;
import com.bonappetit.bonappetitApi.service.IRecetaService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RecetaService implements IRecetaService {

    @Autowired
    private IRecetaRepository iRecetaRepository;
    @Autowired
    private ICategoriaRepository iCategoriaRepository;
    @Autowired
    private IImagenRepository iImagenRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public Receta crearReceta(RecetaEntradaDto recetaEntradaDto) {
        List<Categoria> categorias = new ArrayList<>();
        List<Imagen> imagenes = new ArrayList<>();

        for (Long categoriaId : recetaEntradaDto.getCategorias()){
            Categoria categoria = iCategoriaRepository.findById(categoriaId).orElse(null);
            categorias.add(categoria);
        }

        for (Long imagenId : recetaEntradaDto.getImagenes()) {
            Imagen imagen = iImagenRepository.findById(imagenId).orElse(null);
            imagenes.add(imagen);
        }

        Receta receta = modelMapper.map(recetaEntradaDto, Receta.class);
        receta.setCategorias(categorias);
        receta.setImagenes(imagenes);


        return iRecetaRepository.save(receta);
    }

    @Override
    public List<Receta> listarRecetas() {
        List<Receta> listarRecetas = iRecetaRepository.findAll();
        return listarRecetas;
    }

    @Override
    public void eliminarReceta(Long id) {
        iRecetaRepository.deleteById(id);
    }

    private RecetaSalidaDto entidadADto(Receta receta){
        RecetaSalidaDto recetaSalidaDto = modelMapper.map(receta, RecetaSalidaDto.class);
        return recetaSalidaDto;
    }
}
