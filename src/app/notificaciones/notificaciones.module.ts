import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificacionesPageRoutingModule } from './notificaciones-routing.module';

import { NotificacionesPage } from './notificaciones.page';

import { SolicitudContratoComponent } from "../components/solicitud-contrato/solicitud-contrato.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificacionesPageRoutingModule
  ],
  providers: [
    DatePipe
  ],
  declarations: [NotificacionesPage,SolicitudContratoComponent]
})
export class NotificacionesPageModule {}
