import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltMedicoPageRoutingModule } from './alt-medico-routing.module';

import { AltMedicoPage } from './alt-medico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AltMedicoPageRoutingModule
  ],
  declarations: [AltMedicoPage]
})
export class AltMedicoPageModule {}
