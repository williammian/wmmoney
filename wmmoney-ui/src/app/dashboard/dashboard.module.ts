import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,

    SharedModule,
    DashboardRoutingModule
  ],
  declarations: []
})
export class DashboardModule { }
