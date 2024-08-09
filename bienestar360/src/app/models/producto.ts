export class Producto {
  id: number = 0;
  precio: number | undefined;
  cantidad: number = 0;
  titulo: string | undefined;
  subtitulo: string | undefined;
  beneficios: string  | undefined;
  preguntasRespuestas: string[] | undefined;
  instruccionesDeUso: string | undefined; 
  advertencias: string | undefined;
  imagen: string | undefined;
  constructor() {
    // Inicializa la cantidad a 0
    this.cantidad = 0;
  }
}

//el inicio
//el login
//el catalogo
//el calendario
//la reserva de turnos
