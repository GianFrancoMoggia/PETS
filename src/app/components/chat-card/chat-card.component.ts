import { Component, OnInit, Input } from '@angular/core';
import { ChatServiceService } from 'src/app/services/chat-service.service';
import { userProfile } from 'src/app/shared/user.interface';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.scss'],
})
export class ChatCardComponent implements OnInit {

  @Input() idChat:string
  @Input() idDestinatario:string
  public destinatario:userProfile;

  constructor(private chatServ:ChatServiceService) {
    
    
  }

  ngOnInit() {
    this.chatServ.getDestinatario(this.idDestinatario).subscribe((destinatario)=>{
      this.destinatario=destinatario
    })
  }

}
