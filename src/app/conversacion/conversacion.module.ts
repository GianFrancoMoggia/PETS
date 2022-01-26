import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConversacionPageRoutingModule } from './conversacion-routing.module';

import { ConversacionPage } from './conversacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConversacionPageRoutingModule
  ],
  declarations: [ConversacionPage]
})
export class ConversacionPageModule {}
