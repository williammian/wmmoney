import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CategoriaCadastroComponent } from './categoria-cadastro/categoria-cadastro.component';
import { CategoriasPesquisaComponent } from './categorias-pesquisa/categorias-pesquisa.component';
import { AuthGuard } from 'app/seguranca/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CategoriasPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CATEGORIA'] }
  },
  {
    path: 'nova',
    component: CategoriaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_CATEGORIA'] }
  },
  {
    path: ':codigo',
    component: CategoriaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_CATEGORIA'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
