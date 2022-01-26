import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { OrganizacionService } from "../../services/organizacion.service";
import { UserService } from 'src/app/services/user.service';
import { ContratoPaseador } from 'src/app/shared/contrato-paseador.interface';
import { Observable } from 'rxjs';
import { userProfile } from 'src/app/shared/user.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  public usuario:userProfile
  public adminDeOrgas:boolean
 
  static getElementById(arg0: string): HTMLTextAreaElement {
    throw new Error('Method not implemented.');
  }


  constructor(private menuCtrl: MenuController,private userServ: UserService, private aServ:AuthService, private afs: AngularFirestore, private orga:OrganizacionService) { 
    this.aServ.user$.subscribe((usuario)=>{
      this.usuario=usuario;
    })

  }

  ngOnInit() {
    this.userServ.paseador.subscribe(element => {
      if (element.solicitud_paseo.length > 0) document.getElementById("a").setAttribute("name","mail-unread-outline")
      else document.getElementById("a").setAttribute("name","mail-outline")
    })

    
  }
  
  changeIconMenu(){
    let menuIcon = document.getElementById("menu-icon"); 
    this.menuCtrl.isOpen().then((result) => {
      if(result){
        menuIcon.setAttribute('name', 'menu-outline'); 
      } else{
        menuIcon.setAttribute('name', 'close-outline'); 
      }
    });
  }

  closeMenu(){
    this.menuCtrl.close();
    this.changeIconMenu();
    //this.changeToolBarText();
  }

  closeSession(){
    this.aServ.logout();
    this.closeMenu()
  }
  
}
