import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAgendaPageRoutingModule } from './add-agenda-routing.module';

import { AddAgendaPage } from './add-agenda.page';

import { HTTP } from '@ionic-native/http/ngx';
import { StorageService } from '../storage.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAgendaPageRoutingModule
  ],
  providers: [HTTP, StorageService],
  declarations: [AddAgendaPage]
})
export class AddAgendaPageModule {}
