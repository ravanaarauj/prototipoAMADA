import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { count } from 'console';
import { element } from 'protractor';

@Component({
  selector: 'app-alt-medico',
  templateUrl: './alt-medico.page.html',
  styleUrls: ['./alt-medico.page.scss'],
})
export class AltMedicoPage implements OnInit {

  medico: any = {};

  dias: any[] = ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado', 'domingo'];

  diasAlert: any[] = [];

  id: any;

  constructor(private route: ActivatedRoute, public alertController: AlertController, public fire: AngularFireDatabase) { }

  ngOnInit() {
    this.route.queryParams.subscribe(param => {
      //this.presentAlert(param.id);
      this.id = param.id;
      this.getMedicos();
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

  async presentAlertExclusivo(dia) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      subHeader: '',
      message: 'Qual a exclusividade? ',
      inputs: [
        {
          name: 'exclusivo',
          placeholder: ''
        },
      ],
      buttons: [
        {
          text: 'Confirmar',
          handler: data => {
            this.addExclusividade(dia, data.exclusivo);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();//
  }

  async presentAlertDias() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      inputs: [
        {
          name: 'segunda',
          type: 'checkbox',
          label: 'segunda',
          value: 'segunda',
          checked: this.diasAlert[0],
        },
        {
          name: 'terca',
          type: 'checkbox',
          label: 'terça',
          value: 'terça',
          checked: this.diasAlert[1],
        },
        {
          name: 'quarta',
          type: 'checkbox',
          label: 'quarta',
          value: 'quarta',
          checked: this.diasAlert[2],
        },
        {
          name: 'quinta',
          type: 'checkbox',
          label: 'quinta',
          value: 'quinta',
          checked: this.diasAlert[3],
        },
        {
          name: 'sexta',
          type: 'checkbox',
          label: 'sexta',
          value: 'sexta',
          checked: this.diasAlert[4],
        },
        {
          name: 'sabado',
          type: 'checkbox',
          label: 'sábado',
          value: 'sábado',
          checked: this.diasAlert[5],
        },
        {
          name: 'domingo',
          type: 'checkbox',
          label: 'domingo',
          value: 'domingo',
          checked: this.diasAlert[6],
        },
      ],
      buttons: [
        {
          text: 'Alterar',
          role: 'ok',
          handler: data => {

            console.log(data);
            console.log(this.medico.atendimento);
            
            this.medico.atendimento.forEach(element => {
              if (data.includes(element.dia)) {
                const index = data.indexOf(element.dia);
                data.splice(index, 1);
              }
            });

            data.forEach(element => {
              this.medico.atendimento.push({dia: element});
            });

            console.log(this.medico.atendimento);
            this.fire.database.ref('/medico/' + this.id).set(this.medico);

          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        }
      ]
    });


    await alert.present();

    const { role } = await alert.onDidDismiss();//
  }

  async getMedicos() {
    var m = this.fire.list('medico/' + this.id).valueChanges();
    m.subscribe(objeto => {
      this.medico = {
        atendimento: objeto[0],
        especialidade: objeto[1],
        id: objeto[2],
        matricula: objeto[3],
        nome: objeto[4]
      };

      /*
      this.dias.forEach(element => {
        var teste = false;
        for (let item of this.medico.atendimento) {
          teste = element == item.dia;
          if (teste) {
            break;
          }
        }
        this.diasAlert.push(teste);
      });
      */

      console.log(this.diasAlert);
      //this.presentAlert(JSON.stringify(this.medico));
    })
  }

  remover(dia) {
    this.medico.atendimento.forEach(element => {
      if (element.dia == dia) {
        const index = this.medico.atendimento.indexOf(element);
        this.medico.atendimento.splice(index, 1);
        this.fire.database.ref('/medico/' + this.id).set(this.medico);
      }
    });
    this.removerAgenda(dia);   
  }

  removerAgenda(dia) {
    var a = this.fire.list('agenda').valueChanges();
    var agenda = [];
    a.subscribe(objeto => {
      objeto.forEach(element => {
        let data = new Date(element['data']);
        console.log(this.dias[data.getDay()] == dia);
        if (this.dias[data.getDay()] == dia && this.id == element['medico']) {
          element['status'] = 'cancelada';
          this.fire.database.ref('/agenda/' 
          + element['paciente'] + '-'
          + element['medico'] + '-'
          + element['data'] + '-'
          + element['hora']
          ).set(element);
        }
      });
    });
    this.fire.list('agenda').valueChanges();
  }

  addExclusividade(dia, exclusivo) {
    this.medico.atendimento.forEach(element => {
      if (element.dia == dia) {
        element.exclusivo = exclusivo;
        this.fire.database.ref('/medico/' + this.id).set(this.medico);
      }
    });   
  }

}
