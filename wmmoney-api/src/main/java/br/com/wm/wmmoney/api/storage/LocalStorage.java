package br.com.wm.wmmoney.api.storage;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Component
public class LocalStorage implements FileStorage {
	
	private final String pathTemp = "C:/temp/wmmoney/temp";
	private final String path = "C:/temp/wmmoney";
	
	private final Path locationTemp = Paths.get(pathTemp);
	private final Path location = Paths.get(path);

	@Override
	public String salvarTemporariamente(MultipartFile arquivo) {
		String nomeUnico = gerarNomeUnico(arquivo.getOriginalFilename());
		
		try {
			Files.copy(arquivo.getInputStream(), this.locationTemp.resolve(nomeUnico));
			return nomeUnico;
		}catch (IOException e) {
			throw new RuntimeException("Problemas ao tentar salvar o arquivo temporariamente.", e);
		}
	}

	@Override
	public String configurarUrl(String objeto) {
		return "localhost:8080/lancamentos/anexo/" + objeto;
	}

	@Override
	public void salvar(String objeto) {
		try {
			Files.copy(this.locationTemp.resolve(objeto), this.location.resolve(objeto));
			Files.deleteIfExists(this.locationTemp.resolve(objeto));
		}catch (IOException e) {
			throw new RuntimeException("Problemas ao tentar salvar o arquivo.", e);
		}
	}

	@Override
	public void remover(String objeto) {
		try {
			Files.deleteIfExists(this.location.resolve(objeto));
		}catch (IOException e) {
			throw new RuntimeException("Problemas ao tentar remover o arquivo.", e);
		}
	}

	@Override
	public void substituir(String objetoAntigo, String objetoNovo) {
		if (StringUtils.hasText(objetoAntigo)) {
			this.remover(objetoAntigo);
		}
		salvar(objetoNovo);
	}

	@Override
	public Resource loadFile(String fileName) {
		try {
            Path file = location.resolve(fileName);
            Resource resource = new UrlResource(file.toUri());
            if(resource.exists() || resource.isReadable()) {
                return  resource;
            } else {
                throw new RuntimeException("Falha ao carregar arquivo.");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Falha ao carregar arquivo.");
        }
	}

}
