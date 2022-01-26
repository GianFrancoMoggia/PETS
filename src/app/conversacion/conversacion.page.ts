import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from '../services/chat-service.service';
import { ActivatedRoute } from '@angular/router';
import { Mensaje } from '../shared/message.interface';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { userProfile } from '../shared/user.interface';


@Component({
  selector: 'app-conversacion',
  templateUrl: './conversacion.page.html',
  styleUrls: ['./conversacion.page.scss'],
})
export class ConversacionPage implements OnInit {

  public idChat:string;
  public chat:Observable<Mensaje>
  public usuario:userProfile
  mensaje:string

  constructor(private chatServ:ChatServiceService,private route:ActivatedRoute, private AuthServ:AuthService) {
    this.AuthServ.user$.subscribe((usuario)=>{
      this.usuario=usuario
    })
  }

  async ngOnInit() {
    this.idChat=await this.route.snapshot.paramMap.get("idChat")
    this.chat=this.chatServ.getMensajes(this.idChat)
  }


  enviarMensaje(){
    this.chatServ.enviarMensaje(this.mensaje,this.usuario.uid,this.idChat)
    this.mensaje=""
  }

}
