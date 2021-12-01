import { Component, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { AngularFireDatabase } from '@angular/fire/compat/database';

import { Observable } from 'rxjs/Observable';

import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-agenda-usuario',
  templateUrl: './agenda-usuario.page.html',
  styleUrls: ['./agenda-usuario.page.scss'],
})
export class AgendaUsuarioPage implements OnInit {

  agenda: any[] = [];
  agendaAux: any[] = [];

  listA: Observable<any[]>;

  medicos: any[] = [];

  listB: Observable<any[]>;//

  statusTitulo = ['Solicitadas', 'Confirmadas', 'Excluídas'];

  statusElemento = ['ok', '', 'excluído'];

  titulo = this.statusTitulo[0];

  constructor(public alertController: AlertController, public fire: AngularFireDatabase, private storage: Storage) { }

  ngOnInit() {
    this.getMedicos();
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

  async getAgenda(data: any, status: any) {
    this.listA = await this.fire.list('agenda').valueChanges();
    this.listA.subscribe(list => {
      this.agenda = list;
      var a = [];
      this.agenda.forEach(element => {
        if (status == null) {
          console.log(status);
          if (element.paciente == data.login && element.status != this.statusElemento[0] && element.status != this.statusElemento[2]) {
            a.push(element);
          }
        } else if (status == this.statusElemento[0]) {
          console.log(status);
          var date1 = new Date(element.data);
          var date2 = new Date();
          date2.setDate(date2.getDate() -2);
          if (element.paciente == data.login && element.status == this.statusElemento[0] && date1.getTime() >= date2.getTime()) {
            a.push(element);
          }
        } else if (status == this.statusElemento[2]) {
          console.log(status);
          var date1 = new Date(element.data);
          var date2 = new Date();
          date2.setDate(date2.getDate() -2);
          if (element.paciente == data.login && element.status == this.statusElemento[2]) {
            a.push(element);
          }
        }
      });
      this.agenda = a;
    });
    this.getTitulo(status);
  }

  getTitulo(status) {
    if (status == null) {
      this.titulo =  this.statusTitulo[0];
    } else if (status == this.statusElemento[0]) {
      this.titulo =  this.statusTitulo[1];
    }  else if (status == this.statusElemento[2]) {
      this.titulo =  this.statusTitulo[2];
    }

  }

  async getMedicos() {
    this.listB = await this.fire.list('medico').valueChanges();
    this.listB.subscribe(list => {
      this.medicos = list;
    });
  }

  public findMedico(id) {
    let medico;
    this.medicos.forEach(element => {
      if (element.id == id) {
        medico = element;
      }
    });
    return medico;
  }

  public getMedico(id) {
    return this.findMedico(id).nome;
  }

  consultar() {
    this.storage.get('usuario').then(data => {
      console.log(data);
      this.getAgenda(data, null);
    });
  }

  consultarConfirmadas() {
    this.storage.get('usuario').then(data => {
      console.log(data);
      this.getAgenda(data, this.statusElemento[0]);
    });
  }

  consultarExcluidas() {
    this.storage.get('usuario').then(data => {
      console.log(data);
      this.getAgenda(data, this.statusElemento[2]);
    });
  }


}
