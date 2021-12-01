import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendaUsuarioPageRoutingModule } from './agenda-usuario-routing.module';

import { AgendaUsuarioPage } from './agenda-usuario.page';

import { NativeStorage } from '@ionic-native/native-storage/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendaUsuarioPageRoutingModule
  ],
  providers: [NativeStorage],
  declarations: [AgendaUsuarioPage]
})
export class AgendaUsuarioPageModule {}
