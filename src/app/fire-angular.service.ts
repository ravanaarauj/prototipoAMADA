import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/compat/database';

import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class FireAngularService {

  constructor(public fire: AngularFireDatabase) { }

  async getObjetos(consulta: string) {
    await this.fire.list(consulta).valueChanges().subscribe(list => {
      return list;  
    });
  }


}
