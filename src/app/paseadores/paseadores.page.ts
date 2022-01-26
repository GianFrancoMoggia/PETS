import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PaseosService } from "../services/paseos.service";
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-paseadores',
  templateUrl: './paseadores.page.html',
  styleUrls: ['./paseadores.page.scss'],
})
export class PaseadoresPage implements OnInit {

  constructor(private pasServ:PaseosService, private authServ: AuthService) { }

  ngOnInit() {
    
  }

  

}
