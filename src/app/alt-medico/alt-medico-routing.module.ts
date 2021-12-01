import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AltMedicoPage } from './alt-medico.page';

const routes: Routes = [
  {
    path: '',
    component: AltMedicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AltMedicoPageRoutingModule {}
