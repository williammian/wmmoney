import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputMaskModule } from 'primeng/inputmask';
import { DataTableModule } from 'primeng/datatable';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';

import { UsuariosPesquisaComponent } from './usuarios-pesquisa/usuarios-pesquisa.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    DataTableModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    PanelModule,
    DialogModule,

    SharedModule,
    UsuariosRoutingModule
  ],
  declarations: [UsuariosPesquisaComponent]
})
export class UsuariosModule { }
