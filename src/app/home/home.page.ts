import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { userProfile } from '../shared/user.interface';

import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

  

  constructor(private aServ: AuthService,private userServ: UserService, private afs:AngularFirestore) {}

  ngOnInit() {
    //this.aServ.logout()
  }


}
