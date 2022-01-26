import { Component, OnInit } from '@angular/core';
import { EspecieService } from '../services/especie.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-config-mascota',
  templateUrl: './config-mascota.page.html',
  styleUrls: ['./config-mascota.page.scss'],
})
export class ConfigMascotaPage implements OnInit {

  nombre:string;
  especieMascota:string;
  descripcion:string;
  cuidado:string;

  constructor(private especieServ:EspecieService,private camera: Camera,private file: File, public actionSheetController: ActionSheetController, public uServ:UserService) { 

      this.nombre;
      this.especieMascota;
      this.descripcion;
      this.cuidado;

  }

  ngOnInit() {
  }

  pickImage(sourceType) {
    const options: CameraOptions = {
    quality: 100,
    sourceType: sourceType,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
    }
     this.camera.getPicture(options).then((imageData) => { //imageData lo que tengo que subir a firebase
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    // let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    // Handle error
    });
    }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  subidaAnimal(){
    this.uServ.crearMascota(this.nombre,this.especieMascota,this.descripcion,this.cuidado);
  }

}
