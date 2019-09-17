package br.com.wm.wmmoney.api.repository.lancamento;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import br.com.wm.wmmoney.api.model.Lancamento;
import br.com.wm.wmmoney.api.repository.filter.LancamentoFilter;
import br.com.wm.wmmoney.api.repository.projection.ResumoLancamento;

public interface LancamentoRepositoryQuery {

	public Page<Lancamento> filtrar(LancamentoFilter lancamentoFilter, Pageable pageable);
	
	public Page<ResumoLancamento> resumir(LancamentoFilter lancamentoFilter, Pageable pageable);
	
}
