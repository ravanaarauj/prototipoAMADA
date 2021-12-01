import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';

import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login: string;

  senha: string;

  constructor(private storage: StorageService, public alertController: AlertController, public router: Router) { }

  ngOnInit() {
  }

  async presentAlert(any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      subHeader: '',
      message: 'Mensagem: ' + any,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

    this.router.navigate(['']);
    //navigator['app'].exitApp();
    window.location.assign('/');

  }

  async acessar() {
    await this.storage.setUsuario(this.login, this.senha).then(() => {
      this.presentAlert('Usuário logado!');
    });
  }

  inicio() {
    this.router.navigate(['']);
  }

}
