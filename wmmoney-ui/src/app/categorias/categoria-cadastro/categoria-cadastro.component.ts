import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../categoria.service';
import { Categoria } from './../../core/model';

@Component({
  selector: 'app-categoria-cadastro',
  templateUrl: './categoria-cadastro.component.html',
  styleUrls: ['./categoria-cadastro.component.css']
})
export class CategoriaCadastroComponent implements OnInit {

  categoria = new Categoria();

  constructor(
    private categoriaService: CategoriaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoCategoria = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova categoria');

    if (codigoCategoria) {
      this.carregarCategoria(codigoCategoria);
    }
  }

  get editando() {
    return Boolean(this.categoria.codigo)
  }

  carregarCategoria(codigo: number) {
    this.categoriaService.buscarPorCodigo(codigo)
      .then(categoria => {
        this.categoria = categoria;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarCategoria(form);
    } else {
      this.adicionarCategoria(form);
    }
  }

  adicionarCategoria(form: FormControl) {
    this.categoriaService.adicionar(this.categoria)
      .then(categoriaAdicionada => {
        this.messageService.add({ severity: 'success', detail: 'Categoria adicionada com sucesso!' });
        this.router.navigate(['/categorias', categoriaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarCategoria(form: FormControl) {
    this.categoriaService.atualizar(this.categoria)
      .then(categoria => {
        this.categoria = categoria;

        this.messageService.add({ severity: 'success', detail: 'Categoria alterada com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.categoria = new Categoria();
    }.bind(this), 1);

    this.router.navigate(['/categorias/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de categoria: ${this.categoria.nome}`);
  }

}
