import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-paciente',
  templateUrl: './add-paciente.page.html',
  styleUrls: ['./add-paciente.page.scss'],
})
export class AddPacientePage implements OnInit {

  nome: any = '';
  login: any = '';
  senha: any = '';
  perfil: any = 'paciente';
  id: any;

  listA: Observable<any[]>;

  constructor(public alertController: AlertController, public fire: AngularFireDatabase, private route: Router, private aroute: ActivatedRoute) { }

  ngOnInit() {
    this.aroute.queryParams.subscribe(async param => {
      if (param.id != null) {
        this.id = param.id;
        await this.fire.database.ref('usuario/' + param.id).once('value', (snapshot) => {
          this.nome = snapshot.val().nome;
          this.login = snapshot.val().login;
          this.senha = snapshot.val().senha;
        });
      } else {
        await this.fire.database.ref('usuario').once('value', (snapshot) => {
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
    await this.fire.database.ref('usuario').once('value', (snapshot) => {
      this.fire.database.ref('/usuario/' + this.id)
        .set({ consulta: { 0: { data: '', diagnostico: '' } }, id: this.id, login: this.login, nome: this.nome, perfil: this.perfil, senha: this.senha })
        .then(() => {
          this.route.navigate(['paciente']);
        });
    });
  }

}
