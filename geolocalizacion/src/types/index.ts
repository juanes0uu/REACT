export interface Usuario {
    IdUsuario: number;
    Nombre: string;
    Email: string;
    Documento: string;
}

export interface Lugar {
    IdLugar: number;
    IdUsuario?: number;
    Nombre: string;
    Descripcion?: string;
    Latitud: number;
    Longitud: number;
}

export interface Ruta {
    IdRuta: number;
    IdUsuario: number;
    Nombre: string;
}

export interface RutaDetalle {
    IdRutaDetalle: number;
    IdRuta: number;
    Latitud: number;
    Longitud: number;
    Orden: number;
}

export interface Ubicacion {
    IdUbicacion?: number;
    IdUsuario: number;
    Latitud: number;
    Longitud: number;
    FechaHora?: string;
}
