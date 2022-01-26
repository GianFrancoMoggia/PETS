import { Component, OnInit } from '@angular/core';
import { OrganizacionesService } from '../services/organizaciones.service';
import { AuthService } from '../services/auth.service';
import { userProfile } from '../shared/user.interface';

@Component({
  selector: 'app-misorganizaciones',
  templateUrl: './misorganizaciones.page.html',
  styleUrls: ['./misorganizaciones.page.scss'],
})
export class MisorganizacionesPage implements OnInit {

  public orgFavoritas:string[]

  constructor(private orgServ:OrganizacionesService, private aServ:AuthService) { 
    this.aServ.user$.subscribe((usuario)=>{
      this.orgFavoritas=usuario.orgFavoritas;
    })
    
  }

  ngOnInit() {


  }

}
