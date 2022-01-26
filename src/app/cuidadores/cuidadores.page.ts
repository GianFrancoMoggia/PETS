import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PaseosService } from '../services/paseos.service';

@Component({
  selector: 'app-cuidadores',
  templateUrl: './cuidadores.page.html',
  styleUrls: ['./cuidadores.page.scss'],
})
export class CuidadoresPage implements OnInit {

  constructor(private pasServ:PaseosService, private authServ: AuthService) { }

  ngOnInit() {
  }

}
