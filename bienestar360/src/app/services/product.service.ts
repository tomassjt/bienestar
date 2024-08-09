 


import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
 
  constructor() { }
  getProductById(id: number) {
    console.log("El id buscado es ", id)
    var producto = this.productos.find(p =>  p.id === id )
  
    console.log("se encontrol el producto ",producto)
    return producto;
  }
  getProducts(): any[] {
    return this.productos
  }

  productos: any[] = [
    {
      id: 1,
      precio: 19.99,
      titulo: 'Producto 1',
      subtitulo: 'Descripción corta del Producto 1',
      beneficios: 'Beneficios del Producto 1',
      preguntasRespuestas: ['¿Cómo se usa este producto?', '¿Cuáles son sus ingredientes?'],
      instruccionesDeUso: 'Instrucciones de uso del Producto 1',
      advertencias: 'Advertencias y precauciones para el Producto 1',
      imagen: '/assets/products/producto1.jpg'
    },
    {
      id: 2,
      precio: 39.99,
      titulo: 'Producto 2',
      subtitulo: 'Descripción corta del Producto 2',
      beneficios: 'Beneficios del Producto 2',
      preguntasRespuestas: ['¿Es apto para todo tipo de piel?', '¿Cuánto tiempo dura el envase?'],
      instruccionesDeUso: 'Instrucciones de uso del Producto 2',
      advertencias: 'Advertencias y precauciones para el Producto 2',
      imagen: '/assets/products/producto3.jpeg'
    },
    {
      id: 3,
      precio: 29.99,
      titulo: 'Producto 3',
      subtitulo: 'Descripción corta del Producto 3',
      beneficios: 'Beneficios del Producto 3',
      preguntasRespuestas: ['¿Cuántas veces al día debo usarlo?', '¿Tiene efectos secundarios?'],
      instruccionesDeUso: 'Instrucciones de uso del Producto 3',
      advertencias: 'Advertencias y precauciones para el Producto 3',
      imagen: '/assets/products/producto2.jpeg'
    },
    {
      id: 4,
      precio: 39.99,
      titulo: 'Producto 4',
      subtitulo: 'Descripción corta del Producto 4',
      beneficios: 'Beneficios del Producto 4',
      preguntasRespuestas: ['¿Es apto para todo tipo de piel?', '¿Cuánto tiempo dura el envase?'],
      instruccionesDeUso: 'Instrucciones de uso del Producto 4',
      advertencias: 'Advertencias y precauciones para el Producto 4',
      imagen: '/assets/products/producto3.jpeg'
    },
    {
      id: 5,
      precio: 19.99,
      titulo: 'Producto 5',
      subtitulo: 'Descripción corta del Producto 5',
      beneficios: 'Beneficios del Producto 5',
      preguntasRespuestas: ['¿Cómo se usa este producto?', '¿Cuáles son sus ingredientes?'],
      instruccionesDeUso: 'Instrucciones de uso del Producto 5',
      advertencias: 'Advertencias y precauciones para el Producto 5',
      imagen: '/assets/products/producto1.jpg'
    }
  ];


}
