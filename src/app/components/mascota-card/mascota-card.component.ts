  import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/services/user.service';
import { mascota } from "src/app/shared/mascota.interface";

@Component({
  selector: 'app-mascota-card',
  templateUrl: './mascota-card.component.html',
  styleUrls: ['./mascota-card.component.scss'],
})
export class MascotaCardComponent implements OnInit {

  @Input() id:string
  @Input() idUser:string
  public mascota1:mascota

  constructor(userServ:UserService, private afs: AngularFirestore) { 
   
  } 

  ngOnInit() {
    this.afs.doc<mascota>(`users/${this.idUser}/mascota/${this.id}`).valueChanges().subscribe((mascotita) =>{
      this.mascota1 = mascotita;
      this.mascota1.docId=this.id;
      console.log(mascotita)
      console.log(this.id)
      console.log(this.idUser)
    })
  }

}
