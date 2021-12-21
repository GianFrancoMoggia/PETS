import { Component, OnInit, Input, Renderer2, HostListener } from '@angular/core';
import {DomController} from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { PopoverPerfilComponent } from '../popover-perfil/popover-perfil.component';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Cuidador } from '../../shared/cuidador.interface';
import { ContratoPaseador } from '../../shared/contrato-paseador.interface';
import { Observable } from 'rxjs';
import { userProfile } from '../../shared/user.interface';
import { ObtenerDataService } from '../../services/obtener-data.service';


@Component({
  selector: 'app-paseo-activo',
  templateUrl: './paseo-activo.component.html',
  styleUrls: ['./paseo-activo.component.scss'],
})
export class PaseoActivoComponent implements OnInit {
  @Input() idContrato: string;
  contrato: ContratoPaseador;
  cliente: Observable<userProfile> = new Observable<userProfile>();
  userName: string;
  imgCliente: string;
  idCliente: string;


  constructor(private obDataServ: ObtenerDataService, private afs: AngularFirestore, private aServ:AuthService, private userServ: UserService, private popController: PopoverPerfilComponent) { }

  async ngOnInit(){
    this.afs.doc<ContratoPaseador>(`contratoPaseador/${this.idContrato}`).valueChanges({ idField: "docId" })
    .subscribe((data) => {
      this.contrato = data;
      this.idCliente = data.idCliente;
      this.cliente = this.obDataServ.getUser(data.idCliente);
      this.cliente.subscribe((data) => {
        this.userName = data.nombre + " " + data.apellido;
        this.imgCliente = data.foto;
        });
      });
  }

  async finalizarContrato(id:string){
    this.afs
        .collection("paseador")
        .doc(this.aServ.uid)
        .update({
          contratos: firebase.firestore.FieldValue.arrayRemove(id),
        });
    this.afs
        .collection(`contratoPaseador`)
        .doc(id)
        .update({ estado: "finalizado" });
    this.afs
        .collection("paseador")
        .doc(this.aServ.uid)
        .update({
          avisar: firebase.firestore.FieldValue.arrayUnion(this.idCliente),
        });
    this.afs
        .collection("users")
        .doc(this.idCliente)
        .update({
          avisos: firebase.firestore.FieldValue.arrayUnion(this.aServ.uid),
        });
    
  }
  

}
