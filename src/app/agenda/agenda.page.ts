import { Component, OnInit } from '@angular/core';

import { HTTP } from '@ionic-native/http/ngx';

import { AlertController } from '@ionic/angular';

import { AngularFireDatabase } from '@angular/fire/compat/database';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {

  agenda: any[] = [];

  agendaAux: any[] = [];

  medicos: any[] = [];

  listB: Observable<any[]>;//

  data: any;

  listA: Observable<any[]>;

  titulo: any = 'Em Aberto';

  constructor(private http: HTTP, public alertController: AlertController, public fire: AngularFireDatabase) { }

  ngOnInit() {
    this.getAgenda(0);
    this.getMedicos();
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

  async getAgenda(valor) {
    this.listA = await this.fire.list('agenda').valueChanges();
    this.listA.subscribe(list => {
      this.agenda = list;
      this.agendaAux = list;
      var a = [];
      if (valor == 0) {
        this.agenda.forEach(element => {
          if (element.status != 'ok' && element.status != 'excluído') {
            a.push(element);
          }          
        });
        this.agenda = a;
      } else if (valor == 1) {
        this.agenda.forEach(element => {
          if (element.status == 'ok') {
            a.push(element);
          }          
        });
        this.agenda = a;
      } else if (valor == 2) {
        this.agenda.forEach(element => {
          if (element.status == 'excluído') {
            a.push(element);
          }          
        });
        this.agenda = a;
      }

      
    });
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

  getData() {
    var a = [];
    var b = this.agendaAux;
    b.forEach(element => {
      if (element.data == this.data && this.titulo == 'Em Aberto' && element.status != 'ok' && element.status != 'excluído') {
        a.push(element);
      } else if (element.data == this.data && this.titulo == 'Confirmadas' && element.status == 'ok') {
        a.push(element);
      } else if(element.data == this.data && this.titulo == 'Excluídas' && element.status == 'excluído') {
        a.push(element);
      }
    });
    if (a.length > 0) {
      this.agenda = a;
    } else {
      this.agenda = b;
    }
  }

  consultar() {
    this.getAgenda(0);
    this.titulo = 'Em Aberto';
  }

  consultarConfirmadas() {
    this.getAgenda(1);
    this.titulo = 'Confirmadas';
  }

  consultarExcluidos() {
    this.getAgenda(2);
    this.titulo = 'Excluídas';
  }

  confirmar(item) {
    var n = this.fire.database.ref().child('agenda').push().key;
    var updates = {};
    item.status = 'ok';
    updates['/agenda/' + item.paciente + '-' + item.medico + '-' + item.data + '-' + item.hora] = item;
    this.fire.database.ref().update(updates);
    this.consultar();
  }

  cancelar(item) {
    var n = this.fire.database.ref().child('agenda').push().key;
    var updates = {};
    item.status = 'cancelada';
    updates['/agenda/' + item.paciente + '-' + item.medico + '-' + item.data + '-' + item.hora] = item;
    this.fire.database.ref().update(updates);
    if (this.titulo == 'Excluídas') {
      this.consultarExcluidos;
    } else {
      this.consultarConfirmadas();
    }
  }

  excluir(item) {
    var n = this.fire.database.ref().child('agenda').push().key;
    var updates = {};
    item.status = 'excluído';
    updates['/agenda/' + item.paciente + '-' + item.medico + '-' + item.data + '-' + item.hora] = item;
    this.fire.database.ref().update(updates);
    
  }

}
