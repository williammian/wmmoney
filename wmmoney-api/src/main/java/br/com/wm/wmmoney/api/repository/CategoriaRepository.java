package br.com.wm.wmmoney.api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import br.com.wm.wmmoney.api.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long>{
	
	public Page<Categoria> findByNomeContaining(String nome, Pageable page);

}
