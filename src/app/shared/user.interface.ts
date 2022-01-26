import { mascota } from "./mascota.interface";


export interface User{
  uid: string;
  email: string;
  displayName: string;
  emailVerified: boolean;
}

export interface userProfile{
  nombre: string;
  apellido: string;
  uid: string;
  email: string;
  emailVerified: boolean;
  nacimiento: string;
  administrando:string;
  DNI:number;
  foto:string;
  barrio:string;
  orgFavoritas:Array<string>
  solicitud_admin:Array<string>
  contratosActivos:Map<string,string>
}