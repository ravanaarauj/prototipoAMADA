import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.page.html',
  styleUrls: ['./paciente.page.scss'],
})
export class PacientePage implements OnInit {

  pacientes: any[] = [];

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

  async getPacientes() {
    this.pacientes = [];
    this.listA = this.fire.list('usuario').valueChanges();
    this.listA.subscribe(list => {
      list.forEach(element => {
        if (element.perfil == 'paciente') {
          this.pacientes.push(element);
        }
      });
    });
  }

  consultar() {
    this.getPacientes();
  }

}
