import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { combineAll } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ContratoCuidador, ContratoPaseador } from 'src/app/shared/contrato-paseador.interface';
import { User, userProfile } from 'src/app/shared/user.interface';

@Component({
  selector: 'app-slider-agenda',
  templateUrl: './slider-agenda.component.html',
  styleUrls: ['./slider-agenda.component.scss'],
})
export class SliderAgendaComponent implements OnInit {
  
  public usuario:userProfile;
  public listContratosPaseador:Array<any> = new Array<any>();
  public listContratosCuidador:Array<any> = new Array<any>();
  public listaMascotas:Array<any> = new Array<any>();

  constructor(private aServ:AuthService, private afs:AngularFirestore, private uServ: UserService) { 
    this.aServ.user$.subscribe((data)=>{
      this.usuario=data;
      let contratosActivosMap: Map<string, string> = new Map(Object.entries(this.usuario.contratosActivos));
     
      let listContratosId = Object.keys(this.usuario.contratosActivos);

      listContratosId.forEach(contratoId => {
        let tipoContrato = contratosActivosMap.get(contratoId);
        console.log("idContr",contratoId)
        this.afs.doc<ContratoPaseador>("contrato" + tipoContrato + "/" + contratoId)
        .valueChanges()
        .subscribe((contrato) => {
          if(tipoContrato == "Paseador") this.listContratosPaseador.push(contrato)
          else this.listContratosCuidador.push(contrato)
          console.log(this.listContratosPaseador);
          
        })
      });
    })
    this.uServ.mascotas.subscribe((mascota)=>{
      this.listaMascotas=mascota;
      console.log("Mascota",this.listaMascotas);
    })
  }

  ngOnInit() {
  }
  
}