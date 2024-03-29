import { Component, Input, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { ObtenerDataService } from "src/app/services/obtener-data.service";
import { UserService } from "src/app/services/user.service";
import { ContratoCuidador, ContratoPaseador } from "src/app/shared/contrato-paseador.interface";
import { disponibilidades } from "src/app/shared/disponibilidades.interface";
import { userProfile } from "src/app/shared/user.interface";
import { OrganizacionService } from "src/app/services/organizacion.service";
import { OrganizacionesService } from "src/app/services/organizaciones.service";
import { ActivatedRoute } from "@angular/router";
import { PubliService } from "src/app/services/publi.service";
import { Publicacion } from "src/app/shared/publicacion";
import { Organizacion } from "src/app/shared/organizacion.interface"
import { ChatServiceService } from "src/app/services/chat-service.service";
import { DatePipe } from "@angular/common";
import { Routes } from "@angular/router";
import { Router } from "@angular/router";
import firebase from "firebase/app";
import "firebase/firestore";
import { mascota } from "../../shared/mascota.interface";
import { MapOperator } from "rxjs/internal/operators/map";
import { contratoOrganizacion } from "src/app/shared/contratoOrganizacion";
//import { TouchSequence } from "selenium-webdriver";

@Component({
  selector: "app-solicitud-contrato",
  templateUrl: "./solicitud-contrato.component.html",
  styleUrls: ["./solicitud-contrato.component.scss"],
})
export class SolicitudContratoComponent implements OnInit {
  public publicacion: Observable<Publicacion> = null;
  public organizacion: Observable<Organizacion> = null;
  public contratoOrganizacion: Observable<contratoOrganizacion> = null;
  public momento: string;

  @Input() idContrato: string;
  @Input() tipo: string;
  @Input() idOrga: string;
  @Input() tipoContrato: string;

  botonInfo: string = "ver mas";
  contrato: ContratoPaseador;
  userName: string;
  imgCliente: string;
  barrio: string;
  fecha: string;
  mascotas: Array<mascota[]>;
  contratosActivos = new Map();
  idCliente: string;
  cliente: Observable<userProfile> = new Observable<userProfile>();
  guardaMomento: string;
  idPubli: string;
  dia: string;
  mes: string;
  emojiTipo: string;
  contratoOrganizacionTipo: string;
  muestraTipo: string;
  estilo:string="";

  //variables de Marco porque no quiero tocarle nada a Nachito:
  usrContratado: userProfile; 
  orgaContratada:Organizacion;
  fechaContratacion: string;
  estadoRecibido:string;

  constructor(
    private authServ: AuthService,
    private afs: AngularFirestore,
    private userServ: UserService,
    private obDataServ: ObtenerDataService,
    private org: OrganizacionService,
    private orgas: OrganizacionesService,
    private route: ActivatedRoute,
    private publis: PubliService,
    private date: DatePipe,
    private chatServ:ChatServiceService,
    private router:Router
  ) { }

  async ngOnInit() {
    console.log(this.idContrato)
    
    if (this.tipo == "Avisos"){ 
      switch(this.tipoContrato){
        case "Paseador": 
        this.afs.doc<ContratoPaseador>("contratoPaseador/" + this.idContrato).valueChanges().subscribe((elem)=>{
          this.fechaContratacion = elem.fechaContratacion;
          this.estadoRecibido = elem.estado;
          let idUsrContratado = elem.idPaseador;
          console.log(idUsrContratado)
          this.afs.doc<userProfile>("users/" + idUsrContratado).valueChanges().subscribe((elem2)=>{
            this.usrContratado= elem2;
            console.log(this.usrContratado);
          })
          console.log(this.fechaContratacion);
          console.log(this.estadoRecibido);
        })
        break;  
        case "Cuidador":
          this.afs.doc<ContratoCuidador>("contratoCuidador/" + this.idContrato).valueChanges().subscribe((elem)=>{
            this.fechaContratacion = elem.fechaContratacion;
            this.estadoRecibido = elem.estado;
            let idUsrContratado = elem.idCuidador;
            this.afs.doc<userProfile>("users/" + idUsrContratado).valueChanges().subscribe((elem2)=>{
              this.usrContratado= elem2;
              console.log(this.usrContratado);
            })
            console.log(this.fechaContratacion);
            console.log(this.estadoRecibido);
          })
        break;   
        case "Organizacion":
          this.estilo="organizacion"
          this.afs.doc<contratoOrganizacion>("contratoOrganizacion/" + this.idContrato).valueChanges({idField:"docId"}).subscribe((elem)=>{
            console.log(elem.docId);
            console.log(elem);
            
            this.fechaContratacion = elem.fecha;
            this.estadoRecibido = elem.estado;
            let idUsrContratado = elem.idOrganizacion;
            this.afs.doc<Organizacion>("organización/" + idUsrContratado).valueChanges().subscribe((elem2)=>{
              this.orgaContratada= elem2;
            })
            console.log(this.fechaContratacion);
            console.log(this.estadoRecibido);
          })
        break;
      }
    }
    else if (this.tipo == "Organizacion") {
      this.contratoOrganizacion = this.publis.getContrato(this.idContrato);
      this.organizacion = this.orgas.getOrganizacion(this.idOrga);
      this.contratoOrganizacion.subscribe((contrato) => {
        if (contrato.tipo == 'Transito'){
          this.emojiTipo = String.fromCodePoint(128054) + String.fromCodePoint(9203);
        }
        else{
          this.emojiTipo = String.fromCodePoint(128054) + String.fromCodePoint(9774);
        }
        this.contratoOrganizacionTipo = contrato.tipo;
        this.fecha = contrato.fecha;
        this.idPubli = contrato.idAnimal;

        this.publicacion = this.publis.getPublicacion(
          this.idPubli,
          this.idOrga
        );

        switch (contrato.fecha) {
          case this.date.transform(new Date(), "dd/MM/yyyy"):
            this.momento = "Hoy";
            this.guardaMomento = this.momento;
            break;
          case this.date.transform(new Date(Date.now() - 864e5), "dd/MM/yyyy"):
            this.momento = "Ayer";
            this.guardaMomento = this.momento;
            break;
          case this.date.transform(
            new Date(Date.now() - 864e5 * 2),
            "dd/MM/yyyy"
          ):
            this.momento = "Antes de ayer";
            this.guardaMomento = this.momento;
            break;
          case this.date.transform(
            new Date(Date.now() - 864e5 * 3),
            "dd/MM/yyyy"
          ):
            this.momento = "Hace 3 días";
            this.guardaMomento = this.momento;
            break;
          case this.date.transform(
            new Date(Date.now() - 864e5 * 4),
            "dd/MM/yyyy"
          ):
            this.momento = "Hace 4 días";
            this.guardaMomento = this.momento;
            break;
          case this.date.transform(
            new Date(Date.now() - 864e5 * 5),
            "dd/MM/yyyy"
          ):
            this.momento = "Hace 5 días";
            this.guardaMomento = this.momento;
            break;
          case this.date.transform(
            new Date(Date.now() - 864e5 * 6),
            "dd/MM/yyyy"
          ):
            this.momento = "Hace 6 días";
            this.guardaMomento = this.momento;
            break;
          case this.date.transform(
            new Date(Date.now() - 864e5 * 7),
            "dd/MM/yyyy"
          ):
            this.momento = "Hace 1 semana";
            this.guardaMomento = this.momento;
            break;
          default:
            this.momento = "Hace más de 1 semana";
            this.guardaMomento = this.momento;
        }

        // Evidentemente estos switch no van, algún día me voy a poner a entender los timestamps y arreglarlo, pero de momento esto sirve <3

        if (contrato.fecha.charAt(0) === "0") {
          this.dia = contrato.fecha.charAt(1);
        } else {
          this.dia = contrato.fecha.charAt(0) + contrato.fecha.charAt(1);
        }
        this.mes = contrato.fecha.charAt(3) + contrato.fecha.charAt(4);
        switch (this.mes) {
          case "01":
            this.mes = "Enero";
            break;
          case "02":
            this.mes = "Febrero";
            break;
          case "03":
            this.mes = "Marzo";
            break;
          case "04":
            this.mes = "Abril";
            break;
          case "05":
            this.mes = "Mayo";
            break;
          case "06":
            this.mes = "Junio";
            break;
          case "07":
            this.mes = "Julio";
            break;
          case "08":
            this.mes = "Agosto";
            break;
          case "09":
            this.mes = "Septiembre";
            break;
          case "10":
            this.mes = "Octubre";
            break;
          case "11":
            this.mes = "Noviembre";
            break;
          case "12":
            this.mes = "Diciembre";
            break;
          default:
            this.mes = "ERROR";
        }
        this.fecha = this.dia + " de " + this.mes;
      });
      this.afs
        .doc<any>(`contrato${this.tipo}/${this.idContrato}`)
        .valueChanges({ idField: "docId" })
        .subscribe((data) => {
          this.contrato = data;
          this.cliente = this.obDataServ.getUser(data.idTransitante);
          this.idCliente = data.idTransitante;
          this.cliente.subscribe((data) => {
            this.userName = data.nombre + " " + data.apellido;
            this.imgCliente = data.foto;
            this.barrio = data.barrio;
          });
        });
    } else {
      this.afs
        .doc<any>(`contrato${this.tipo}/${this.idContrato}`)
        .valueChanges({ idField: "docId" })
        .subscribe((data) => {
          this.contrato = data;
          this.cliente = this.obDataServ.getUser(data.idCliente);
          this.idCliente = data.idCliente;
          this.cliente.subscribe((data) => {
            this.userName = data.nombre + " " + data.apellido;
            this.imgCliente = data.foto;
            this.barrio = data.barrio;
            let mascotasUser = this.obDataServ.getMascotas(data.uid);
            mascotasUser.subscribe((mascotas) => {
              this.mascotas = new Array<mascota[]>();
              mascotas.forEach((mascota) => {
                if (this.contrato.idMascota.includes(mascota.docId)) {
                  this.mascotas.push(mascota);
                }
              });
            });
          });
          if (this.tipo == "Paseador") {
            this.contrato.dias.forEach((element) => {
              document.getElementById(
                this.idContrato + element
              ).style.background = "#7bd7b5";
            });
          }
        });
    }
  }

  async aceptarContrato(idContrato: string) {

    this.chatServ.crearChat(this.idCliente,this.authServ.uid)
   
    let attr2: string = this.idContrato;
    document.getElementById(this.idContrato).style.transform =
      "translateX(-120%)";
    await this.delay(200);
    this.afs
      .collection(`contrato${this.tipo}`)
      .doc(idContrato)
      .update({ estado: "aceptado" });
    if (this.tipo == "Organizacion") {
      this.afs
        .collection("organización")
        .doc(this.idOrga)
        .update({
          solicitud_transito: firebase.firestore.FieldValue.arrayRemove(
            this.idContrato
          ),
        });
      this.afs
        .collection("organización")
        .doc(this.idOrga)
        .update({
          contratos: firebase.firestore.FieldValue.arrayUnion(this.idContrato),
        });
      this.afs
        .doc<Publicacion>(
          `organización/${this.idOrga}/publicaciones/${this.idPubli}`
        )
        .update({
          transito: true,
        });
      this.afs.collection("users").doc(this.idCliente).set({
        "cambioDeEstado": {
          [this.idContrato]:'Organizacion'}
      }, {merge:true});

    } else if (this.tipo == "Paseador") {
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
      this.afs.collection("users").doc(this.idCliente).set({
        "cambioDeEstado": {
          [this.idContrato]:'Paseador'}
      }, {merge:true});
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
        this.afs.collection("users").doc(this.idCliente).set({
            "cambioDeEstado": {
              [this.idContrato]:'Cuidador'}
        }, {merge:true});
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

    let attr: string = "contratosActivos." + this.idContrato;
    this.afs.collection("users").doc(this.idCliente).update({
      [attr]: this.tipo
    })

    if (this.tipo == "Paseador") {

    }

    this.router.navigate(["/chat"]);
  }

  async rechazarContrato(idContrato: string) {
    let attr2: string = this.idContrato; //logar que al aceptar por parte de quien da el servicio se ponga bien la notificacion en el cliente
    document.getElementById(this.idContrato).style.transform =
      "translateX(120%)";
    await this.delay(200);
    this.afs
      .collection(`contrato${this.tipo}`)
      .doc(idContrato)
      .update({ estado: "rechazado" });

    if (this.tipo == "Organizacion") {
      this.afs
        .collection("organización")
        .doc(this.idOrga)
        .update({
          solicitud_transito: firebase.firestore.FieldValue.arrayRemove(
            this.idContrato
          ),
        });
      this.afs
        .doc<contratoOrganizacion>(`contratoOrganizacion/${this.idContrato}`)
        .update({
          cambioDeEstado: new Date(),
        });
      this.afs
        .collection("users")
        .doc(this.idCliente)
        .update({
          cambioDeEstado: {[attr2]:this.tipo},
        });
    } else if (this.tipo == "Paseador") {
      this.afs
        .collection("paseador")
        .doc(this.authServ.uid)
        .update({
          solicitud_paseo: firebase.firestore.FieldValue.arrayRemove(
            this.idContrato
          ),
        });
      this.afs
        .collection("users")
        .doc(this.idCliente)
        .update({
          cambioDeEstado: firebase.firestore.FieldValue.arrayUnion(this.idContrato),
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
        .collection("users")
        .doc(this.idCliente)
        .update({
          cambioDeEstado: firebase.firestore.FieldValue.arrayUnion(this.idContrato),
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
      document.getElementById(this.idContrato).style.height = "auto";
      this.momento = this.fecha;
      this.botonInfo = "ver menos";
      if (this.tipo == "Organizacion") {
        this.muestraTipo = this.contratoOrganizacionTipo;
      }
    } else {
      document.getElementById(this.idContrato).style.height = "65px";
      this.botonInfo = "ver mas";
      this.momento = this.guardaMomento;
      if (this.tipo == "Organizacion") {
        this.muestraTipo = '';
      }
    }
  }

  vistoContrato(idContrato:string){
    this.afs.collection("users").doc(this.authServ.uid).update({
        ['cambioDeEstado.' + idContrato]: firebase.firestore.FieldValue.delete()
    })
    /*this.afs.collection("users").doc(this.idCliente).set({
      "cambioDeEstado": {
        [this.idContrato]:'Cuidador'}
  }, {merge:true});*/
  }
}
