package br.com.wm.wmmoney.api.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import br.com.wm.wmmoney.api.model.Pessoa;
import br.com.wm.wmmoney.api.repository.PessoaRepository;

@Service
public class PessoaService {

	@Autowired
	private PessoaRepository pessoaRepository;

	public Pessoa atualizar(Long codigo, Pessoa pessoa) {
		Pessoa pessoaSalva = pessoaRepository.findOne(codigo);
		if (pessoaSalva == null) {
			throw new EmptyResultDataAccessException(1);
		}
		
		BeanUtils.copyProperties(pessoa, pessoaSalva, "codigo");
		return pessoaRepository.save(pessoaSalva);
	}
	
}
