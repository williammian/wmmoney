import { Title } from '@angular/platform-browser';

import { Component, OnInit, ViewChild } from '@angular/core';

import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService, LazyLoadEvent } from 'primeng/components/common/api';

import { ErrorHandlerService } from 'app/core/error-handler.service';
import { UsuarioFiltro, UsuarioService } from './../usuario.service';

@Component({
  selector: 'app-usuarios-pesquisa',
  templateUrl: './usuarios-pesquisa.component.html',
  styleUrls: ['./usuarios-pesquisa.component.css']
})
export class UsuariosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new UsuarioFiltro();
  usuarios = [];
  @ViewChild('tabela') grid;

  constructor(
    private usuarioService: UsuarioService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de usuários');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.usuarioService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.usuarios = resultado.usuarios;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(usuario: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(usuario);
      }
    });
  }

  excluir(usuario: any) {
    this.usuarioService.excluir(usuario.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.messageService.add({ severity: 'success', detail: 'Usuário excluído com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
