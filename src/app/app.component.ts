import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import {ConectividadService} from './services/conectividad.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  constructor(private alertController:AlertController,private conectividad:ConectividadService,private aServ:AuthService,private router: Router,private alertCtrl: AlertController) {
    this.conectividad.appIsOnline$.subscribe(online => {

      console.log(online)
  
      if (online) {console.log("online")} else {
  
        this.presentAlert("Verifique su conexión a internet","Sin conexión")
  
      }
    })
  }

  async presentAlert(subtitulo:string,mensaje:string) {
    const alert = await this.alertController.create({
      cssClass: 'conectAlert',
      header: 'Alerta',
      subHeader: subtitulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
  

  
}
