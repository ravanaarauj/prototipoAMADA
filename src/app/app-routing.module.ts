import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'agenda-usuario',
    pathMatch: 'full'
  },
  {
    path: 'folder',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'consultas',
    loadChildren: () => import('./consultas/consultas.module').then( m => m.ConsultasPageModule)
  },
  {
    path: 'agenda',
    loadChildren: () => import('./agenda/agenda.module').then( m => m.AgendaPageModule)
  },
  {
    path: 'add-agenda',
    loadChildren: () => import('./add-agenda/add-agenda.module').then( m => m.AddAgendaPageModule)
  },
  {
    path: 'agenda-usuario',
    loadChildren: () => import('./agenda-usuario/agenda-usuario.module').then( m => m.AgendaUsuarioPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'medico',
    loadChildren: () => import('./medico/medico.module').then( m => m.MedicoPageModule)
  },
  {
    path: 'add-medico',
    loadChildren: () => import('./add-medico/add-medico.module').then( m => m.AddMedicoPageModule)
  },
  {
    path: 'alt-medico',
    loadChildren: () => import('./alt-medico/alt-medico.module').then( m => m.AltMedicoPageModule)
  },
  {
    path: 'paciente',
    loadChildren: () => import('./paciente/paciente.module').then( m => m.PacientePageModule)
  },
  {
    path: 'add-paciente',
    loadChildren: () => import('./add-paciente/add-paciente.module').then( m => m.AddPacientePageModule)
  },
  {
    path: 'alt-paciente',
    loadChildren: () => import('./alt-paciente/alt-paciente.module').then( m => m.AltPacientePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
