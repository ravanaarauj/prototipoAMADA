import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMedicoPageRoutingModule } from './add-medico-routing.module';

import { AddMedicoPage } from './add-medico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddMedicoPageRoutingModule
  ],
  declarations: [AddMedicoPage]
})
export class AddMedicoPageModule {}
