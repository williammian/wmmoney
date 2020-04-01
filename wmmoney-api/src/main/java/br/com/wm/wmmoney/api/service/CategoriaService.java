package br.com.wm.wmmoney.api.service;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import br.com.wm.wmmoney.api.model.Categoria;
import br.com.wm.wmmoney.api.repository.CategoriaRepository;

@Service
public class CategoriaService {

	@Autowired
	private CategoriaRepository categoriaRepository;

	public Categoria atualizar(Long codigo, Categoria categoria) {
		Categoria categoriaSalva = buscarCategoriaPeloCodigo(codigo);
		
		BeanUtils.copyProperties(categoria, categoriaSalva, "codigo");
		return categoriaRepository.save(categoriaSalva);
	}
	
	private Categoria buscarCategoriaPeloCodigo(Long codigo) {
		Optional<Categoria> categoria = categoriaRepository.findById(codigo);
		if (!categoria.isPresent()) {
			throw new EmptyResultDataAccessException(1);
		}
		return categoria.get();
	}
	
}
