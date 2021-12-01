import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-medico',
  templateUrl: './add-medico.page.html',
  styleUrls: ['./add-medico.page.scss'],
})
export class AddMedicoPage implements OnInit {

  nome: any = '';
  matricula: any = '';
  especialidade: any = '';
  id: any;

  listA: Observable<any[]>;

  constructor(public alertController: AlertController, public fire: AngularFireDatabase, private route: Router, private aroute: ActivatedRoute) { }

  ngOnInit() {
    this.aroute.queryParams.subscribe(async param => {
      if (param.id != null) {
        this.id = param.id;
        await this.fire.database.ref('medico/' + param.id).once('value', (snapshot) => {
          this.nome = snapshot.val().nome;
          this.matricula = snapshot.val().matricula;
          this.especialidade = snapshot.val().especialidade;
        });
      } else {
        await this.fire.database.ref('medico').once('value', (snapshot) => {
          this.id = snapshot.numChildren();
        });
      }
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

  async salvar() {
    await this.fire.database.ref('medico').once('value', (snapshot) => {
      this.fire.database.ref('/medico/' + this.id)
        .set({ atendimento: { 0: { dia: '' } }, especialidade: this.especialidade, id: this.id, matricula: this.matricula, nome: this.nome })
        .then(() => {
          this.route.navigate(['medico']);
        });
    });
  }

}
