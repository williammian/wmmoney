package br.com.wm.wmmoney.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.wm.wmmoney.api.model.Lancamento;

public interface LancamentoRepository extends JpaRepository<Lancamento, Long>{

}
