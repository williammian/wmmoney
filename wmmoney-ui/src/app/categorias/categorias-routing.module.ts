import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CategoriaCadastroComponent } from './categoria-cadastro/categoria-cadastro.component';
import { CategoriasPesquisaComponent } from './categorias-pesquisa/categorias-pesquisa.component';

const routes: Routes = [
  { path: 'categorias', component: CategoriasPesquisaComponent },
  { path: 'categorias/nova', component: CategoriaCadastroComponent },
  { path: 'categorias/:codigo', component: CategoriaCadastroComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
