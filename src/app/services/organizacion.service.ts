import { Injectable } from "@angular/core";
import { Organizacion } from "../shared/organizacion.interface";

import firebase from "firebase/app";

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

import { AuthService } from "../services/auth.service";
import { User } from "../shared/user.interface";

@Injectable({
  providedIn: "root",
})
export class OrganizacionService {
  public oid: string;
  public organizacion: Observable<Organizacion>; //organización que se está administrando actualmente
  public organizaciones: Observable<Organizacion[]>; //todas las organizaciones que el usuario en sesión administra

  constructor(private afs: AngularFirestore, private authSvc: AuthService) {
    this.authSvc.user$.subscribe((usuario)=>{
      this.organizaciones=this.afs.collection<Organizacion>(`organización`,ref=> ref.where("administradores","array-contains",usuario.uid)).valueChanges()
      this.organizacion=this.afs.doc<Organizacion>(`organización/${usuario.administrando}`).valueChanges()
      this.oid=usuario.administrando
    })
    
  }

  actualizarOrganizacion(oid: string) {
    this.oid=oid;
    this.organizacion=this.afs.doc<Organizacion>(`organización/${oid}`).valueChanges()
    this.afs.collection("users").doc(this.authSvc.uid).update({ administrando: oid });
  }


  /*public getCurrentUserAssignments(): Observable<any> {
    return new Observable((observer) => {
        const query = this.afs.firestore.collection("organización")
          .where("administradores", "array-contains", this.authSvc.user$.uid);

        let _currentUserAssignments = query.get().then(querySnapshot => {
            this.ngZone.run(() => {
                observer.next(querySnapshot.docSnapshots);
            });
        });
    });
}*/

}
