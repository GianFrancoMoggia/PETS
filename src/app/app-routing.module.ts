import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate , emailVerified, redirectLoggedInTo , redirectUnauthorizedTo } from "@angular/fire/auth-guard";

const redirectUnauthorizedToLogin  = () =>  redirectUnauthorizedTo(["/login"])

const redirectLoggedInToHome = () => redirectLoggedInTo(["/home"])



const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full' ,
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginPageModule),
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./verify-email/verify-email.module').then((m) => m.VerifyEmailPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then((m) => m.ForgotPasswordPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'perfil-usuario',
    loadChildren: () => import('./perfil-usuario/perfil-usuario.module').then( m => m.PerfilUsuarioPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'perfil-organizacion',
    loadChildren: () => import('./perfil-organizacion/perfil-organizacion.module').then( m => m.PerfilOrganizacionPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'configuraciones',
    loadChildren: () => import('./configuraciones/configuraciones.module').then( m => m.ConfiguracionesPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'config-mascota',
    loadChildren: () => import('./config-mascota/config-mascota.module').then( m => m.ConfigMascotaPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'paseadores',
    loadChildren: () => import('./paseadores/paseadores.module').then( m => m.PaseadoresPageModule)
  },
  {
    path: 'crear-paseo',
    loadChildren: () => import('./crear-paseo/crear-paseo.module').then( m => m.CrearPaseoPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'plan-cuidado',
    loadChildren: () => import('./plan-cuidado/plan-cuidado.module').then( m => m.PlanCuidadoPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'perfil/:id',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'combo-cuidador',
    loadChildren: () => import('./combo-cuidador/combo-cuidador.module').then( m => m.ComboCuidadorPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'config-publicacion',
    loadChildren: () => import('./config-publicacion/config-publicacion.module').then( m => m.ConfigPublicacionPageModule)
  },
  {
    path: 'publicacion/:id/:idOrga',
    loadChildren: () => import('./publicacion/publicacion.module').then( m => m.PublicacionPageModule)
  },
  {
    path: 'cuidadores',
    loadChildren: () => import('./cuidadores/cuidadores.module').then( m => m.CuidadoresPageModule)
  },
  {
    path: 'reserva/:uid/:pid/:tipo',
    loadChildren: () => import('./reserva/reserva.module').then( m => m.ReservaPageModule)
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule)
  },
  {
    path: 'organizaciones',
    loadChildren: () => import('./organizaciones/organizaciones.module').then( m => m.OrganizacionesPageModule)
  },
  {
    path: 'misorganizaciones',
    loadChildren: () => import('./misorganizaciones/misorganizaciones.module').then( m => m.MisorganizacionesPageModule)
  },
  {
    path: 'organizacion/:id',
    loadChildren: () => import('./organizacion/organizacion.module').then( m => m.OrganizacionPageModule)
  },
  {
    path: 'conversacion/:idChat',
    loadChildren: () => import('./conversacion/conversacion.module').then( m => m.ConversacionPageModule)
  },
  {
    path: 'mascota/:idUsuario/:idMascota',
    loadChildren: () => import('./mascota/mascota.module').then( m => m.MascotaPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }