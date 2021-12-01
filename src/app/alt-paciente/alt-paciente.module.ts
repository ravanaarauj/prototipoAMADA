import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltPacientePageRoutingModule } from './alt-paciente-routing.module';

import { AltPacientePage } from './alt-paciente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AltPacientePageRoutingModule
  ],
  declarations: [AltPacientePage]
})
export class AltPacientePageModule {}
