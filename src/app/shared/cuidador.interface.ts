export interface Cuidador{
    calificacion_promedio: number;
    cupo:number;
    disponibilidad:boolean;
    idUsuario:string;
    precio_dia:number;
    maximoMascotas:number;
    contratos:Array<string>;
    solicitud_cuidado:Array<string>;
}
