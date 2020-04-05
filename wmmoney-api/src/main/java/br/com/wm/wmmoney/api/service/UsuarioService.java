package br.com.wm.wmmoney.api.service;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import br.com.wm.wmmoney.api.model.Usuario;
import br.com.wm.wmmoney.api.repository.UsuarioRepository;

@Service
public class UsuarioService {
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	public Usuario salvar(Usuario usuario) { 
		Long codigo = usuarioRepository.getMaxId();
		if(codigo == null) codigo = 0L;
		codigo++;
		usuario.setCodigo(codigo);
		return usuarioRepository.save(usuario);
	}

	public Usuario atualizar(Long codigo, Usuario usuario) {
		Usuario usuarioSalvo = buscarUsuarioPeloCodigo(codigo);
		
		usuarioSalvo.getPermissoes().clear();
		usuarioSalvo.getPermissoes().addAll(usuario.getPermissoes());
		
		BeanUtils.copyProperties(usuario, usuarioSalvo, "codigo", "permissoes");
		return usuarioRepository.save(usuarioSalvo);
	}
	
//	public void atualizarPropriedadeAtivo(Long codigo, Boolean ativo) {
//		Pessoa pessoaSalva = buscarPessoaPeloCodigo(codigo);
//		pessoaSalva.setAtivo(ativo);
//		pessoaRepository.save(pessoaSalva);
//	}
	
	private Usuario buscarUsuarioPeloCodigo(Long codigo) {
		Optional<Usuario> usuario = usuarioRepository.findById(codigo);
		if (!usuario.isPresent()) {
			throw new EmptyResultDataAccessException(1);
		}
		return usuario.get();
	}

}
