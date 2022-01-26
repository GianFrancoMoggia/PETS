import { Injectable } from '@angular/core';
import { mascota } from '../shared/mascota.interface';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import firebase from "firebase/app";

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  constructor(private afs: AngularFirestore) { }

  getMascota(idMascota:string,idUsuario:string){
    return(this.afs.doc<mascota>(`users/${idUsuario}/mascota/${idMascota}`).valueChanges({idField:"idMascota"}))
  }
}
