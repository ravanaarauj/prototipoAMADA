import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendaPageRoutingModule } from './agenda-routing.module';

import { AgendaPage } from './agenda.page';

import { HTTP } from '@ionic-native/http/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendaPageRoutingModule
  ],
  providers: [HTTP],
  declarations: [AgendaPage]
})
export class AgendaPageModule {}
