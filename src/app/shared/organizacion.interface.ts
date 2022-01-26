export interface Organizacion{
    administradores:string[];
    mail:string;
    nombre:string;
    foto:string;
    localizacion:string;
    oid:string;
    solicitud_transito:Array<string>;
    contratos:Array<string>;
  }