import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPacientePageRoutingModule } from './add-paciente-routing.module';

import { AddPacientePage } from './add-paciente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPacientePageRoutingModule
  ],
  declarations: [AddPacientePage]
})
export class AddPacientePageModule {}
