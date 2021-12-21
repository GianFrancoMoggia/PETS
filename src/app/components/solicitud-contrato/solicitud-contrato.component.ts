import { Component, Input, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { ObtenerDataService } from "src/app/services/obtener-data.service";
import { UserService } from "src/app/services/user.service";
import { ContratoPaseador } from "src/app/shared/contrato-paseador.interface";
import { disponibilidades } from "src/app/shared/disponibilidades.interface";
import { userProfile } from "src/app/shared/user.interface";
import firebase from "firebase/app";
import "firebase/firestore";

import { mascota } from "../../shared/mascota.interface";

@Component({
  selector: "app-solicitud-contrato",
  templateUrl: "./solicitud-contrato.component.html",
  styleUrls: ["./solicitud-contrato.component.scss"],
})
export class SolicitudContratoComponent implements OnInit {
  @Input() idContrato: string;
  @Input() tipo: string;

  botonInfo: string = "ver mas";
  contrato: ContratoPaseador;
  userName: string;
  imgCliente: string;
  barrio: string;
  fecha:string;
  mascotas: Array<mascota[]>;
  cliente: Observable<userProfile> = new Observable<userProfile>();

  constructor(
    private authServ: AuthService,
    private afs: AngularFirestore,
    private userServ: UserService,
    private obDataServ: ObtenerDataService
  ) {}

  ngOnInit() {
    if(this.tipo != "avisos"){
    this.afs
    .doc<any>(`contrato${this.tipo}/${this.idContrato}`)
    .valueChanges({ idField: "docId" })
    .subscribe((data) => {
      console.log(1);
      this.contrato = data;
      this.cliente = this.obDataServ.getUser(data.idCliente);
      this.cliente.subscribe((data) => {
        this.userName = data.nombre + " " + data.apellido;
        this.imgCliente = data.foto;
        this.barrio = data.barrio;
        let mascotasUser = this.obDataServ.getMascotas(data.uid);
        mascotasUser.subscribe((mascotas) => {
          this.mascotas = new Array<mascota[]>();
          mascotas.forEach(mascota => {
            if(this.contrato.idMascota.includes(mascota.docId)){
              this.mascotas.push(mascota);
            }
          });
          console.log(this.mascotas)
        })
      });
      if (this.tipo == "Paseador") {
        this.contrato.dias.forEach((element) => {
          document.getElementById(this.idContrato + element).style.background = "#7bd7b5";
        });
      }
    });
    }
    else if (this.tipo == "avisos"){
    this.afs
    .doc<any>(`users/${this.idContrato}`)
    .valueChanges({ idField: "docId" })
    .subscribe((data) => {
      this.cliente = data;
      this.userName = data.nombre + "" + data.apellido;
      this.imgCliente = data.foto;
      });
    }
  }

  async aceptarContrato(idContrato: string) {
    document.getElementById(this.idContrato).style.transform =
      "translateX(-120%)";
    await this.delay(200);
    this.afs
      .collection(`contrato${this.tipo}`)
      .doc(idContrato)
      .update({ estado: "aceptado" });
    if (this.tipo == "avisos") {
      this.afs
        .collection("users")
        .doc(this.authServ.uid)
        .update({
          avisos: firebase.firestore.FieldValue.arrayRemove(
            this.idContrato
          ),
        });
      this.afs
        .collection("paseador")
        .doc(this.idContrato)
        .update({
          avisar: firebase.firestore.FieldValue.arrayRemove(this.authServ.uid),
        });
      }
      else if (this.tipo == "Paseador") {
      this.afs
        .collection("paseador")
        .doc(this.authServ.uid)
        .update({
          solicitud_paseo: firebase.firestore.FieldValue.arrayRemove(
            this.idContrato
          ),
        });
      this.afs
        .collection("paseador")
        .doc(this.authServ.uid)
        .update({
          contratos: firebase.firestore.FieldValue.arrayUnion(this.idContrato),
        });
    } else {
      this.afs
        .collection("cuidador")
        .doc(this.authServ.uid)
        .update({
          solicitud_cuidado: firebase.firestore.FieldValue.arrayRemove(
            this.idContrato
          ),
        });
      this.afs
        .collection("cuidador")
        .doc(this.authServ.uid)
        .update({
          contratos: firebase.firestore.FieldValue.arrayUnion(this.idContrato),
        });
    }

    if (this.tipo == "Paseador") {
      let disponibilidades: any = await this.getDisponibilidades();

      this.contrato.dias.forEach((element) => {
        let cantMascotas: number = this.contrato.idMascota.length;
        switch (element) {
          case "Lunes":
            disponibilidades.Lunes = disponibilidades.Lunes - cantMascotas;
            break;
          case "Martes":
            disponibilidades.Martes = disponibilidades.Martes - cantMascotas;
            break;
          case "Miercoles":
            disponibilidades.Miercoles =
              disponibilidades.Miercoles - cantMascotas;
            break;
          case "Jueves":
            disponibilidades.Jueves = disponibilidades.Jueves - cantMascotas;
            break;
          case "Viernes":
            disponibilidades.Viernes = disponibilidades.Viernes - cantMascotas;
            break;
          case "Sabado":
            disponibilidades.Sabado = disponibilidades.Sabado - cantMascotas;
            break;
          case "Domingo":
            disponibilidades.Domingo = disponibilidades.Domingo - cantMascotas;
            break;
        }
      });
      console.log(disponibilidades);
      this.afs
        .doc(
          "paseador/" +
            this.authServ.uid +
            "/planpaseador/" +
            this.contrato.planContratado +
            "/disponibilidades/" +
            disponibilidades.docId
        )
        .update({
          Lunes: disponibilidades.Lunes,
          Martes: disponibilidades.Martes,
          Miercoles: disponibilidades.Miercoles,
          Jueves: disponibilidades.Jueves,
          Viernes: disponibilidades.Viernes,
          Sabado: disponibilidades.Sabado,
          Domingo: disponibilidades.Domingo,
        });

      let semana: Array<boolean> = new Array<boolean>();

      if (disponibilidades.Lunes <= 0) semana.push(false);
      else semana.push(true);
      if (disponibilidades.Martes <= 0) semana.push(false);
      else semana.push(true);
      if (disponibilidades.Miercoles <= 0) semana.push(false);
      else semana.push(true);
      if (disponibilidades.Jueves <= 0) semana.push(false);
      else semana.push(true);
      if (disponibilidades.Viernes <= 0) semana.push(false);
      else semana.push(true);
      if (disponibilidades.Sabado <= 0) semana.push(false);
      else semana.push(true);
      if (disponibilidades.Domingo <= 0) semana.push(false);
      else semana.push(true);

      console.log(semana);

      this.afs
        .doc(
          "paseador/" +
            this.authServ.uid +
            "/planpaseador/" +
            this.contrato.planContratado
        )
        .update({
          lunes: semana[0],
          martes: semana[1],
          miercoles: semana[2],
          jueves: semana[3],
          viernes: semana[4],
          sabado: semana[5],
          domingo: semana[6],
        });
    }
  }

  async rechazarContrato(idContrato: string) {
    document.getElementById(this.idContrato).style.transform =
      "translateX(120%)";
    await this.delay(200);
    this.afs
      .collection(`contrato${this.tipo}`)
      .doc(idContrato)
      .update({ estado: "rechazado" });

    if (this.tipo == "Paseador") {
      this.afs
        .collection("paseador")
        .doc(this.authServ.uid)
        .update({
          solicitud_paseo: firebase.firestore.FieldValue.arrayRemove(
            this.idContrato
          ),
        });
    } else {
      this.afs
        .collection("cuidador")
        .doc(this.authServ.uid)
        .update({
          solicitud_cuidado: firebase.firestore.FieldValue.arrayRemove(
            this.idContrato
          ),
        });
    }
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async getDisponibilidades() {
    return await new Promise((resolve, reject) => {
      this.afs
        .collection<disponibilidades>(
          "paseador/" +
            this.authServ.uid +
            "/planpaseador/" +
            this.contrato.planContratado +
            "/disponibilidades"
        )
        .valueChanges({ idField: "docId" })
        .subscribe((data) => {
          resolve(data[0]);
        });
    }).then((res) => {
      return res;
    });
  }

  expandirSolicitud() {
    if (this.botonInfo == "ver mas") {
      document.getElementById(this.idContrato).style.height = "520px";
      this.botonInfo = "ver menos";
    } else {
      document.getElementById(this.idContrato).style.height = "65px";
      this.botonInfo = "ver mas";
    }
  }
}
