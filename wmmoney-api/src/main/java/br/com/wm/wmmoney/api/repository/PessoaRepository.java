package br.com.wm.wmmoney.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.wm.wmmoney.api.model.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa, Long>{

}
