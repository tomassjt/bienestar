import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root',
 
})
export class CarritoService {
  private readonly STORAGE_KEY = 'productosCarrito';
  productosCarrito: Producto[] = new Array();
  constructor() {
    if (typeof window !== 'undefined') {
      this.loadCarritoFromStorage();
    }

  }
  private saveCarritoToStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.productosCarrito));
    }
  }
  private loadCarritoFromStorage() {
    if (typeof window !== 'undefined') {
      const storedCarrito = localStorage.getItem(this.STORAGE_KEY);
      if (storedCarrito) {
        this.productosCarrito = JSON.parse(storedCarrito);
      }
    }
  }


  insertarProducto(prod: Producto): Promise<Producto[]> {
    return new Promise((resolve, reject) => {
      // Buscar el índice del producto en el carrito
      const index = this.productosCarrito.findIndex(p => p.id === prod.id);

      if (index !== -1) {
        // Si el producto ya está en el carrito, incrementar la cantidad
        this.productosCarrito[index].cantidad = this.productosCarrito[index].cantidad  + 1;
      } else {
        // Si el producto no está en el carrito, agregarlo con cantidad inicial de 1
        prod.cantidad = 1;

        this.productosCarrito.push(prod);
      }

      // Resolver la promesa con el carrito actualizado
      this.saveCarritoToStorage();
      resolve(this.productosCarrito);
    });
  }

  

  quitarProducto(producto: Producto): Producto[] {
    const index = this.productosCarrito.indexOf(producto);
    if (index > -1) {
      this.productosCarrito[index].cantidad = this.productosCarrito[index].cantidad - 1;
      if (this.productosCarrito[index].cantidad == 0) {
        this.productosCarrito.splice(index, 1);
      }
      this.saveCarritoToStorage();
      return this.productosCarrito;
    }
    return this.productosCarrito;
  }

  vaciarCarrito(): boolean {
    this.productosCarrito = [];
    localStorage.clear();
    return true;
  }
  // Método para obtener los productos del carrito desde el localStorage
  obtenerProductosCarrito(): Producto[] {
    return this.productosCarrito;
  }

}
