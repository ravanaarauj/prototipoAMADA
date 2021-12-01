import { Component, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { AngularFireDatabase } from '@angular/fire/compat/database';

import { Observable } from 'rxjs/Observable';
import { FireAngularService } from '../fire-angular.service';

import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.page.html',
  styleUrls: ['./consultas.page.scss'],
})
export class ConsultasPage implements OnInit {

  consultas: any[] = [];

  listA: Observable<any[]>;

  constructor(public alertController: AlertController, public fire: AngularFireDatabase, private storage: Storage) { }


  ngOnInit() {
    this.getConsultas();
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

    const { role } = await alert.onDidDismiss();//
  }

  async getConsultas() {
    await this.storage.get('usuario').then(data => {
        this.listA = this.fire.list('usuario').valueChanges();
        this.listA.subscribe(list => {
        var usuarios = list;
        var a = [];
        usuarios.forEach(element => {
          if (element.login == data.login) {
            element.consulta.forEach(element2 => {
              a.push(element2)
            });
          }          
        });
        this.consultas = a;
      });
    });
  }

  consultar() {

    this.getConsultas();

  }

}
