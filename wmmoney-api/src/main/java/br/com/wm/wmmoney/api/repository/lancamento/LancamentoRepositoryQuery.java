package br.com.wm.wmmoney.api.repository.lancamento;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import br.com.wm.wmmoney.api.dto.LancamentoEstatisticaCategoria;
import br.com.wm.wmmoney.api.dto.LancamentoEstatisticaDia;
import br.com.wm.wmmoney.api.dto.LancamentoEstatisticaPessoa;
import br.com.wm.wmmoney.api.model.Lancamento;
import br.com.wm.wmmoney.api.repository.filter.LancamentoFilter;
import br.com.wm.wmmoney.api.repository.projection.ResumoLancamento;

public interface LancamentoRepositoryQuery {

	public Page<Lancamento> filtrar(LancamentoFilter lancamentoFilter, Pageable pageable);
	
	public Page<ResumoLancamento> resumir(LancamentoFilter lancamentoFilter, Pageable pageable);
	
	public List<LancamentoEstatisticaCategoria> porCategoria(LocalDate mesReferencia);
	
	public List<LancamentoEstatisticaDia> porDia(LocalDate mesReferencia);
	
	public List<LancamentoEstatisticaPessoa> porPessoa(LocalDate inicio, LocalDate fim);
	
}
