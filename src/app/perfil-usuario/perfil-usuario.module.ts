import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, PopoverController } from '@ionic/angular';

import { PerfilUsuarioPageRoutingModule } from './perfil-usuario-routing.module';

import { PerfilUsuarioPage } from './perfil-usuario.page';

import { DirectivesModule } from '../directives/directives.module';
import { PopoverPerfilComponent } from '../components/popover-perfil/popover-perfil.component';
import { PaseosComponent } from '../components/paseos/paseos.component';
import { CuidadosComponent } from '../components/cuidados/cuidados.component';

@NgModule({
  declarations: [PerfilUsuarioPage,PopoverPerfilComponent,PaseosComponent,CuidadosComponent],
  providers: [PopoverPerfilComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilUsuarioPageRoutingModule,
    DirectivesModule,
  ],
})
export class PerfilUsuarioPageModule {}
