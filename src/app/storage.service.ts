import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

import { AngularFireDatabase } from '@angular/fire/compat/database';
import { exit } from 'process';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;

  usuarios: any[] = [];

  constructor(private storage: Storage, public fire: AngularFireDatabase) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  getUsuario() {
    this.storage.get("usuario").then(data => {
      return data;
    });
  }

  async setUsuario(login: any, senha: any) {
    await this.fire.list('usuario').valueChanges().subscribe(list => {
      this.usuarios = list;
      this.usuarios.forEach(element => {
        if (element.senha == senha && element.login == login) {
          let usuario = element;
          this._storage?.set('usuario', usuario);
        }
      });
    });
  }
  
}
