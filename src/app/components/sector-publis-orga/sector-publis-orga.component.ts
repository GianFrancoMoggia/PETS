import { Component, OnInit, Input} from '@angular/core';
import { Observable } from 'rxjs';
import { OrganizacionesService } from 'src/app/services/organizaciones.service';
import { Organizacion } from 'src/app/shared/organizacion.interface';
import { AuthService } from 'src/app/services/auth.service';
import { userProfile } from 'src/app/shared/user.interface';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Publicacion } from 'src/app/shared/publicacion';

@Component({
  selector: 'app-sector-publis-orga',
  templateUrl: './sector-publis-orga.component.html',
  styleUrls: ['./sector-publis-orga.component.scss'],
})
export class SectorPublisOrgaComponent implements OnInit {

  public ahora=new Date();
  public publicaciones:Array<Publicacion>=[];
  public publisRecientes:boolean;

  constructor(private orgServ:OrganizacionesService, private aServ:AuthService, private afs:AngularFirestore) { }

  ngOnInit() {
    
    this.ahora.setDate(this.ahora.getDate()-2)
    this.revisarPublis()
    
  }

  revisarPublis(){
    this.publisRecientes=false
    this.publicaciones=[]
    
    this.aServ.user$.orgFavoritas.forEach((org)=>{
      this.afs.collection<Publicacion>(`organización/${org}/publicaciones`,ref=>(ref.where("fecha",">=",this.ahora))).valueChanges().subscribe((publi)=>{
        
        if(publi.length>0){
          
          this.publisRecientes=true;
          publi.forEach((pub)=>{

            this.publicaciones.push(pub)
          })
        }else if(this.publisRecientes!=true){this.publisRecientes=false}
      })
    })
    
  }

  

}
