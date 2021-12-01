import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultasPageRoutingModule } from './consultas-routing.module';

import { ConsultasPage } from './consultas.page';
import { FireAngularService } from '../fire-angular.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultasPageRoutingModule,
  ],
  providers: [FireAngularService],
  declarations: [ConsultasPage]
})
export class ConsultasPageModule {}
