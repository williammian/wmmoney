package br.com.wm.wmmoney.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.wm.wmmoney.api.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
	
	public Optional<Usuario> findByEmail(String email);
	
	public List<Usuario> findByPermissoesDescricao(String permissaoDescricao);
	
	@Query("SELECT max(u.codigo) FROM Usuario u")
	public Long getMaxId();
	
	public Page<Usuario> findByNomeContaining(String nome, Pageable pageable);

}
