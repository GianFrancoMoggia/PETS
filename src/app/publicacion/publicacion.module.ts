import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicacionPageRoutingModule } from './publicacion-routing.module';

import { PublicacionPage } from './publicacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicacionPageRoutingModule
  ],
  providers: [
    DatePipe
  ],
  declarations: [PublicacionPage]
})
export class PublicacionPageModule {}
