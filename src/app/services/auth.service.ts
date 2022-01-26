import { Injectable , OnInit} from '@angular/core';
import { User, userProfile } from '../shared/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';

import firebase from 'firebase/app';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Dia } from '../dia';

@Injectable({
  providedIn: 'root',
})

export class AuthService implements OnInit{
  public user$:Observable<userProfile>;
  public uid:string;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore,) {
   
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        console.log("user");
        this.uid=user.uid;
        this.user$=this.afs.doc<userProfile>(`users/${user.uid}`).valueChanges({idField:"uid"})
        
      }
      
      
    });
  }

  ngOnInit() {
    console.log(this.user$,1);
    
    
    
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async loginGoogle(): Promise<User> {
    try {
      
      const { user } = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      
      if (!(await this.afs.doc(`users/${user.uid}`).get().toPromise()).exists){
        await this.updateUserData(user,null,null,null,null,null,null,null,null,null);
      }
      
      return user;
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async register(email: string, password: string, nombre: string, apellido: string, nacimiento: string, dni:number): Promise<User> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.sendVerifcationEmail();
      await this.updateUserData(user,nombre,apellido,nacimiento,dni,null,null,null,null,null);//adiafjaofjaiofjaiosio
      return user;
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password); 
      this.afs.collection("users").doc(user.uid).update({emailVerified: true});
      return user;
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async sendVerifcationEmail(): Promise<void> {
    try {
      return (await this.afAuth.currentUser).sendEmailVerification();
    } catch (error) {
      console.log('Error->', error);
    }
  }

  isEmailVerified(user: User): boolean {
    return user.emailVerified === true ? true : false;
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log('Error->', error);
    }
  }

  private async updateUserData(user: User, nombre: string, apellido: string, nacimiento:string, dni:number, foto:string, barrio:string, orgFavoritas:Array<string>, solicitud_admin:Array<string>, contratosActivos:Map<string,string>) {
    const userRef: AngularFirestoreDocument<userProfile> = this.afs.doc(`users/${user.uid}`);
    
    let dataAux:any=[];
    dataAux.push(user.uid);
    dataAux.push(user.email);
    dataAux.push(user.emailVerified);
    
    if(nombre == null){
      dataAux.push(user.displayName)
      dataAux.push(null)
    } else {
      dataAux.push(nombre)
      dataAux.push(apellido)
    }

    if(nacimiento == null){
      dataAux.push("--/--/----")
    } else {
      dataAux.push(nacimiento)
    }
    
    if(dni == null){
      dataAux.push(11111111)
    }
    else{
      dataAux.push(dni)
    }

    dataAux.push(foto);
    dataAux.push(barrio);
    dataAux.push(orgFavoritas);
    dataAux.push(solicitud_admin);
    dataAux.push(contratosActivos);

    var data: userProfile = {
      uid: dataAux[0],
      email: dataAux[1],
      emailVerified: dataAux[2],
      nombre: dataAux[3],
      apellido: dataAux[4],
      nacimiento: dataAux[5],
      DNI: dataAux[6],
      administrando:null, //arregla
      foto: dataAux[7],
      barrio:dataAux[8],
      orgFavoritas:dataAux[9],
      solicitud_admin:dataAux[10],
      contratosActivos:dataAux[11]
    };
    
  
    return userRef.set(data, { merge: true });
  }

  async actualizarDatos(nombre:string,apellido:string,email:string,nacimiento:string,dni:number,uid:string,administrando:string,foto:string, barrio:string, orgFavoritas:Array<string>,solicitud_admin:Array<string>,contratosActivos:Map<string,string>){
    
    const userRef: AngularFirestoreDocument<userProfile> = this.afs.doc(`users/${uid}`);
    
    let mailVerificar:any=true//( await (await this.user$.toPromise()).emailVerified);

    if(apellido==""){
      apellido=null;
    }

    var data: userProfile = {
      uid: uid,
      email: email,
      emailVerified: mailVerificar ,
      nombre: nombre,
      apellido: apellido,
      nacimiento: nacimiento,
      DNI: dni,
      administrando:  administrando,
      foto:foto,
      barrio: barrio,
      orgFavoritas:orgFavoritas,
      solicitud_admin:solicitud_admin,
      contratosActivos:contratosActivos,
    };
    console.log(data);
    return userRef.set(data, { merge: true });
  }

}


// // you can rewrite this
// const name = app.name;
// const version = app.version;
// const type = app.type;

// // as this
// const { name, version, type } = app;

// return this.angularFirestore.collection(coleccion).snapshotChanges();