import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from '../services/chat-service.service';
import { Chat } from '../shared/chat.interface';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage{

  public idChat:string
  public idDestinatario:string

  constructor(private chatServ:ChatServiceService) {
  }

  ngOnInit() {
    
    
  }

  setValoresID(idDestinatario:string,idChat:string){
    this.idDestinatario=idDestinatario
    this.idChat=idChat
    return true
  }

}
