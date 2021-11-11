import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { OrganizacionService } from '../services/organizacion.service';
import { OrganizacionesService } from '../services/organizaciones.service';
import { PaseosService } from '../services/paseos.service';
import { Paseador } from '../shared/paseador';
import { Cuidador } from '../shared/cuidador.interface';
import { Organizacion } from '../shared/organizacion.interface';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {
  public paseador:Observable<Paseador>=null
  public cuidador:Observable<Cuidador>=null
  public administrando:Observable<Organizacion>=null

  tab: string;

  constructor(private authSvc: AuthService, private userServ: UserService, private org: OrganizacionService, private trabajo: PaseosService, private date:DatePipe, private orgas: OrganizacionesService) { }

  ngOnInit() {
    this.tab = 'Servicios';
    this.administrando = this.orgas.getAdministrando(this.authSvc.user$.uid);
    /*this.paseador = this.trabajo.getPaseador(this.authSvc.user$.uid);
    this.cuidador = this.trabajo.getCuidador(this.authSvc.user$.uid);
    this.paseador.subscribe((data)=>{
      console.log(data.calificacion_promedio);
      
      if(data.solicitud_paseo.length > 0)
        this.hayPaseo = true;
      
      else
      this.hayPaseo = false;

    })
    this.cuidador.subscribe((data)=>{
      if(data.solicitud_cuidado.length > 0)
        this.hayCuidado = true;
      
      else
      this.hayCuidado = false;

    })*/

  
  }

  cambiarPestania(tab:string){
    this.tab = tab;
    document.getElementById(tab+'I').style.color = "#7bd7b5";
    document.getElementById(tab+'L').style.color = "#7bd7b5";
  }

}
