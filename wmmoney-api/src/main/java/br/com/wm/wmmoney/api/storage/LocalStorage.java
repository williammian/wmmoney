package br.com.wm.wmmoney.api.storage;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import br.com.wm.wmmoney.api.config.property.WmmoneyApiProperty;

@Component
public class LocalStorage implements FileStorage {
		
	private final WmmoneyApiProperty wmmoneyApiProperty;
	
	private final String pathTemp;
	private final String pathStorage;
	
	private final Path locationTemp;
	private final Path locationStorage;
	
	@Autowired
	public LocalStorage(WmmoneyApiProperty wmmoneyApiProperty) {
		this.wmmoneyApiProperty = wmmoneyApiProperty;
		
		this.pathTemp = System.getProperty("java.io.tmpdir");
		this.pathStorage = wmmoneyApiProperty.getLocalStorage().getPath();
		
		this.locationTemp = Paths.get(pathTemp);
		this.locationStorage = Paths.get(pathStorage);
	}
	
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
		return wmmoneyApiProperty.getServer() + "/lancamentos/download/anexo/" + objeto;
	}

	@Override
	public void salvar(String objeto) {
		try {
			Files.move(this.locationTemp.resolve(objeto), this.locationStorage.resolve(objeto));
		}catch (IOException e) {
			throw new RuntimeException("Problemas ao tentar salvar o arquivo.", e);
		}
	}

	@Override
	public void remover(String objeto) {
		try {
			Files.deleteIfExists(this.locationTemp.resolve(objeto));
			Files.deleteIfExists(this.locationStorage.resolve(objeto));
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

//	@Override
//	public byte[] loadFile(String fileName) {
//		try {
//            byte[] file = Files.readAllBytes(this.location.resolve(fileName));
//            return file;
//        } catch (IOException e) {
//            throw new RuntimeException("Falha ao carregar arquivo.");
//        }
//	}
	
	@Override
	public Resource loadFile(String fileName) {
		try {
            Path file = locationStorage.resolve(fileName);
            Resource resource = new UrlResource(file.toUri());
            if(resource.exists() || resource.isReadable()) {
                return  resource;
            } else {
            	file = locationTemp.resolve(fileName);
            	resource = new UrlResource(file.toUri());
            	if(resource.exists() || resource.isReadable()) {
                    return  resource;
            	} else {
            		throw new RuntimeException("Falha ao carregar arquivo.");
            	}
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Falha ao carregar arquivo.");
        }
	}

}
