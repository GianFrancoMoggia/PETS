import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConversacionPage } from './conversacion.page';

const routes: Routes = [
  {
    path: '',
    component: ConversacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConversacionPageRoutingModule {}
