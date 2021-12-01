import { Component } from '@angular/core';

import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { AlertController } from '@ionic/angular';

import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {


  public appPages = [];

  public labels = [];

  constructor(public alertController: AlertController, private router: Router, private storage: Storage) {
    this.ngOnInit().then(() => {
      this.iniciarApp();
    });
  }

  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
  }

  async iniciarApp() {
    await this.storage.get('usuario').then(usuario => {
      if (usuario) {
        if (usuario.perfil == 'paciente') {
          this.appPages.push(
            { title: 'Marcar', url: '/add-agenda', icon: 'calendar' },
            { title: 'Agenda', url: '/agenda-usuario', icon: 'list' },
            { title: 'Consultas', url: '/consultas', icon: 'heart-dislike' },
          );
          this.router.navigate(['agenda-usuario']);
        } else if (usuario.perfil == 'servidor') {
          this.appPages.push(
            { title: 'Confirmar', url: '/agenda', icon: 'checkmark' },
            { title: 'Médicos', url: '/medico', icon: 'medkit' },
            { title: 'Pacientes', url: '/paciente', icon: 'person' },
          );
          this.router.navigate(['agenda']);
        }
      } else {
        this.router.navigate(['login']);
      }
    });
  }

  sair() {
    this.storage.remove('usuario').then(() => {
      //navigator['app'].exitApp();
      window.location.assign('/');
    });
  }

}
