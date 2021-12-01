import { Component, OnInit } from '@angular/core';

import { HTTP } from '@ionic-native/http/ngx';

import { AlertController } from '@ionic/angular';

import { AngularFireDatabase } from '@angular/fire/compat/database';

import { Observable } from 'rxjs/Observable';
import { element } from 'protractor';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { find } from 'rxjs-compat/operator/find';
import { EMLINK } from 'constants';
import { exit } from 'process';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-add-agenda',
  templateUrl: './add-agenda.page.html',
  styleUrls: ['./add-agenda.page.scss'],
})
export class AddAgendaPage implements OnInit {

  datas: string;

  semana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

  listA: Observable<any[]>;

  listB: Observable<any[]>;//

  agenda: any[] = [];

  medicos: any[] = [];

  usuario: any;

  horas: any[] = [];

  horasMarcadas: any[] = [];

  dsemana = ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado', 'domingo'];

  constructor(private http: HTTP, public alertController: AlertController, public fire: AngularFireDatabase, private storage: Storage) { }

  ngOnInit() {
    this.getAgenda();
    this.getMedicos();
    this.usuario = this.storage.get("usuario").then(data => {
      this.usuario = data;
    });
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

  async getAgenda() {
    this.listA = await this.fire.list('agenda').valueChanges();
    this.listA.subscribe(list => {
      this.agenda = list;
    });
  }

  async setAgenda(d: string, h: string, m: string, p: string) {
    this.getAgenda();
    if (this.findAgenda(m, p, d)) {
      await this.fire.database.ref('/agenda/' + p + '-' + m + '-' + d + '-' + h)
      .set({ data: d, hora: h, medico: m, paciente: p, status: '' }).then(() => {
        this.presentAlert("Consulta agendada.");
        this.consultar();
      });
    } else {
      this.presentAlert("Não foi possível agendar.");
    }
  }

  findAgenda(m: string, p: string, d: string) {
    var retorno = true;
    this.agenda.forEach(element => {
      //this.presentAlert((element.data == d) && (element.paciente == p));
      if ((element.medico == m) && (element.d == d) && (element.paciente == p)) {
        retorno = false;
      }
    });
    //this.presentAlert(retorno);
    return retorno;
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

  public findAtendimento(medico) {
    var retorno = 'geral';
    medico.atendimento.forEach(element => {
      var ds = new Date(this.datas).getDay();
      var teste = element.dia == this.dsemana[ds];    
      if (teste) {
        if (element.exclusivo) {
          retorno = element.exclusivo;
        }
      }
    });
    return retorno;
  }

  findAtendimentoDia(atendimento) {
    var ds = new Date(this.datas).getDay();
    var teste = atendimento.dia == this.dsemana[ds];
    return teste;
  }

  alterarData(event) {
    this.datas = event.target.value;
  }

  consultar() {

    this.getAgenda();

    this.getMedicos();

    if ((this.agenda.length == 0 || this.medicos.length == 0) || this.datas == undefined) {
      if (this.datas == undefined) {
        this.presentAlert("Data indefinida. Informe uma data para agendar.");
      }
      return;
    } else {
      this.preencherLista();
    }

  }

  preencherLista() {

    this.horasMarcadas = [];

    this.agenda.forEach(element => {
      if (element.data == this.datas && element.status != 'excluído') {
        this.horasMarcadas.push(element);
      }
    });

    this.horas = [];

    for (let i = 7; i < 18; i++) {
      this.medicos.forEach(element => {
        var hora = {
          hora: i,
          medico: null,
        };
        if (element.atendimento) {
          element.atendimento.forEach(element2 => {
            if (this.findAtendimentoDia(element2)) {
              console.log(element2);
              hora.medico = element;
              let teste = true;
              this.horasMarcadas.forEach(element3 => {
                if (element3.hora == hora.hora && element3.medico == hora.medico.id) {
                  teste = false;
                }
              });
              if (teste) {
                this.horas.push(hora);
              }
            }  
          });
        }
      });
    }

  }

  async agendar(item: any) {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cadastrar',
      subHeader: 'Cartão do SUS',
      message: 'Informe o número do seu cartão do SUS',
      inputs: [
        {
          name: 'd',
          id: 'd',
          type: 'date',
          value: this.datas,
          disabled: true,
          placeholder: ''
        },
        {
          name: 'h',
          id: 'h',
          type: 'text',
          value: item.hora,
          disabled: true,
          placeholder: 'hora'
        },
        {
          name: 'm',
          id: 'm',
          type: 'text',
          value: item.medico.id.toString(),
          disabled: true,
          placeholder: 'médico'
        },
        {
          name: 'p',
          id: 'p',
          type: 'text',
          value: this.usuario.login,
          disabled: true,
        },
      ],
      buttons: [
        {
          text: 'Salvar',
          cssClass: 'secondary',
          handler: (data) => {
            this.setAgenda(data.d, data.h, data.m, data.p);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
        },
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

  }

}
