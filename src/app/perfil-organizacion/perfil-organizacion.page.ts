import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, HostListener, Input} from '@angular/core';
import { MenuComponent } from '../components/menu/menu.component';
import { PopoverAddAdministradoresComponent } from '../components/popover-add-administradores/popover-add-administradores.component';
import { PopoverPerfilComponent } from '../components/popover-perfil/popover-perfil.component';
import { OrganizacionService } from "../services/organizacion.service";
import { PubliService } from '../services/publi.service';


@Component({
  selector: 'app-perfil-organizacion',
  templateUrl: './perfil-organizacion.page.html',
  styleUrls: ['./perfil-organizacion.page.scss'],
})

export class PerfilOrganizacionPage implements OnInit {


  
  idOrganizacion:string;

  constructor(private org:OrganizacionService,private publiServ:PubliService, private popController: PopoverAddAdministradoresComponent) { 

  }

  ngOnInit() {
    this.idOrganizacion = this.org.oid
    this.publiServ.publicaciones = this.publiServ.getPublicaciones(this.org.oid)
  }

  customActionSheetOptions: any = {
    header: 'Organizaciones',
    subHeader: 'Elige que organizacion administrar'
  };

  cambiarOrganizacion(){
    this.org.actualizarOrganizacion(this.idOrganizacion)
    this.publiServ.publicaciones = this.publiServ.getPublicaciones(this.org.oid)
  }

}
