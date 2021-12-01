import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddMedicoPage } from './add-medico.page';

const routes: Routes = [
  {
    path: '',
    component: AddMedicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddMedicoPageRoutingModule {}
