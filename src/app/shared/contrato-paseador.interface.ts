import { Timestamp } from "rxjs/internal/operators/timestamp";

export interface ContratoPaseador {
        cantMascotas:number;
        estado:string;
        idCliente:string
        idMascota:Array<string>;
        dias:Array<string>;
        idPaseador:string;
        planContratado:string;
        fechaContratacion:string;
        docId:string;
}

export interface ContratoCuidador{
    cantMascotas:number;
    estado:string;
    idCliente:string
    idMascota:Array<string>;
    diasTotales:number;
    idCuidador:string;
    planContratado:string;
    fechaContratacion:any;
    fechaInicio:any
    docId:string;
}
