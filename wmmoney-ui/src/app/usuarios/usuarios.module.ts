import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosPesquisaComponent } from './usuarios-pesquisa/usuarios-pesquisa.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,

    SharedModule,
    UsuariosRoutingModule
  ],
  declarations: [UsuariosPesquisaComponent]
})
export class UsuariosModule { }
