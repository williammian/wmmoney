package br.com.wm.wmmoney.api.repository.listener;

import javax.persistence.PostLoad;

import org.springframework.util.StringUtils;

import br.com.wm.wmmoney.api.WmmoneyApiApplication;
import br.com.wm.wmmoney.api.model.Lancamento;
import br.com.wm.wmmoney.api.storage.FileStorage;

public class LancamentoAnexoListener {
	
	@PostLoad
	public void postLoad(Lancamento lancamento) {
		if (StringUtils.hasText(lancamento.getAnexo())) {
			FileStorage fileStorage = WmmoneyApiApplication.getBean(FileStorage.class);
			lancamento.setUrlAnexo(fileStorage.configurarUrl(lancamento.getAnexo()));
		}
	}

}
