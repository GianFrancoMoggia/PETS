import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { SliderAgendaComponent } from './../components/slider-agenda/slider-agenda.component'
import { SectorPublisOrgaComponent } from '../components/sector-publis-orga/sector-publis-orga.component';
import { PubliCardComponent } from '../components/publi-card/publi-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    
  ],
  declarations: [HomePage,SliderAgendaComponent,SectorPublisOrgaComponent,PubliCardComponent]
})
export class HomePageModule {}
