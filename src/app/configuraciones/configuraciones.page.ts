import { Component, NgModule, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController } from '@ionic/angular';


// import { ImagePicker } from '@ionic-native/image-picker/ngx';



@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.page.html',
  styleUrls: ['./configuraciones.page.scss'],
})
export class ConfiguracionesPage implements OnInit {
  
  nombre:string;
  apellido:string;
  DNI:number;
  correo:string;
  fechaNacimiento:string;
  uid:string;
  administrando:string;
  foto:string;
  barrio:string;
  orgFavoritas:Array<string>;
  solicitud_admin:Array<string>;
  contratosActivos: Map<string,string>;
  
  // private imagePicker: ImagePicker
  constructor(private afs: AngularFirestore, private aServ:AuthService,private camera: Camera,private file: File, public actionSheetController: ActionSheetController,) {
    this.aServ.user$.subscribe((usuario)=>{
      this.nombre=usuario.nombre;
      this.apellido=usuario.apellido;
      this.DNI=usuario.DNI;
      this.correo=usuario.email;
      this.fechaNacimiento=usuario.nacimiento;
      this.uid=usuario.uid;
      this.administrando=usuario.administrando;
      this.foto=usuario.foto;
      this.barrio=usuario.barrio;
      this.orgFavoritas=usuario.orgFavoritas
      this.solicitud_admin=usuario.solicitud_admin;
      this.contratosActivos=usuario.contratosActivos;
   
    })
      
  }

  ngOnInit() {}

  async cambiarDatos(){
    this.aServ.actualizarDatos(this.nombre,this.apellido,this.correo,this.fechaNacimiento,this.DNI,this.uid,this.administrando,this.foto,this.barrio,this.orgFavoritas,this.solicitud_admin,this.contratosActivos);
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






}

    
