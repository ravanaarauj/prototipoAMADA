import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.page.html',
  styleUrls: ['./medico.page.scss'],
})
export class MedicoPage implements OnInit {

  medicos: any[] = [];

  listA;

  constructor(public alertController: AlertController, public fire: AngularFireDatabase) { }

  ngOnInit() {
    this.consultar();
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

  async getMedicos() {
    this.medicos = [];
    this.listA = this.fire.list('medico').valueChanges();
    this.listA.subscribe(list => {
      this.medicos = list;
    });
  }

  getAtendimento(atendimento) {
    return JSON.stringify(atendimento);
  }

  consultar() {
    this.getMedicos();
  }

}
