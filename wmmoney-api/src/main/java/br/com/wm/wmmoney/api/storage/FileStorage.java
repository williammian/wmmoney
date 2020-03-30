package br.com.wm.wmmoney.api.storage;

import java.util.UUID;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileStorage {
	
	public String salvarTemporariamente(MultipartFile arquivo);
	
	public String configurarUrl(String objeto);
	
	public void salvar(String objeto);

	public void remover(String objeto);
	
	public void substituir(String objetoAntigo, String objetoNovo);
	
	public Resource loadFile(String fileName);
	
	default String gerarNomeUnico(String originalFilename) {
		return UUID.randomUUID().toString() + "_" + originalFilename;
	}

}
