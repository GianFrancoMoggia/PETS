import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PubliService } from '../services/publi.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MascotaService } from '../services/mascota.service';
import { mascota } from '../shared/mascota.interface';

@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.page.html',
  styleUrls: ['./mascota.page.scss'],
})
export class MascotaPage implements OnInit {

  idMascota:string
  idUsuario:string
  public mascota:Observable<mascota>

  constructor(private publiServ:PubliService, private route:ActivatedRoute, private authServ:AuthService, private masServ:MascotaService) {
    
  }

  async ngOnInit() {
    this.idMascota=await this.route.snapshot.paramMap.get("idMascota")
    this.idUsuario=await this.route.snapshot.paramMap.get("idUsuario")
    this.mascota=this.masServ.getMascota(this.idMascota,this.idUsuario)
  }


  mostrarTexto(id:string){
    let vista=document.getElementById(id).style.display;
    if (vista=='none')
      vista='block';
    else
      vista='none';
	  document.getElementById(id).style.display = vista;
  }

}
