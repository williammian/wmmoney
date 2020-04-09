import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';
import { SelectItem } from 'primeng/api';

import { Usuario, Permissao } from './../../core/model';
import { UsuarioService } from './../usuario.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit {

  usuario = new Usuario();

  permissoes: SelectItem[];

  selectedPermissoes: number[];

  constructor(
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {
    this.permissoes = [
      { label: 'Cadastrar Lançamento', value: 6 },
      { label: 'Remover Lançamento', value: 7 },
      { label: 'Pesquisar Lançamento', value: 8 },

      { label: 'Cadastrar Pessoa', value: 3 },
      { label: 'Remover Pessoa', value: 4 },
      { label: 'Pesquisar Pessoa', value: 5 },

      { label: 'Cadastrar Categoria', value: 1 },
      { label: 'Remover Categoria', value: 2 },
      { label: 'Pesquisar Categoria', value: 9 }
    ];
  }

  ngOnInit() {
    const codigoUsuario = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo usuário');

    if (codigoUsuario) {
      this.carregarUsuario(codigoUsuario);
    }
  }

  get editando() {
    return Boolean(this.usuario.codigo)
  }

  carregarPermissoesSelecionadas() {
    let permissoesSelecionadas = new Array();
    for(let permissao of this.usuario.permissoes) {
      permissoesSelecionadas.push(permissao.codigo);
    }
    this.selectedPermissoes = permissoesSelecionadas;
  }

  carregarUsuario(codigo: number) {
    this.usuarioService.buscarPorCodigo(codigo)
      .then(usuario => {
        this.usuario = usuario;
        this.atualizarTituloEdicao();
        this.carregarPermissoesSelecionadas();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarUsuario(form);
    } else {
      this.adicionarUsuario(form);
    }
  }

  adicionarUsuario(form: FormControl) {
    this.usuarioService.adicionar(this.usuario)
      .then(usuarioAdicionado => {
        this.messageService.add({ severity: 'success', detail: 'Usuário adicionado com sucesso!' });
        this.router.navigate(['/usuarios', usuarioAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarUsuario(form: FormControl) {
    this.usuarioService.atualizar(this.usuario)
      .then(usuario => {
        this.usuario = usuario;

        this.messageService.add({ severity: 'success', detail: 'Usuário alterado com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.usuario = new Usuario();
    }.bind(this), 1);

    this.router.navigate(['/usuarios/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de usuário: ${this.usuario.nome}`);
  }

}
