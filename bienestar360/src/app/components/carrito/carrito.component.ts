import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { ProductService } from '../../services/product.service';
import { Producto } from '../../models/producto';
import { Router } from '@angular/router';
import { FooterComponent } from '../shared/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [FooterComponent, MatButtonModule,   MatIconModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {
  carritoVacio: boolean = true;
  constructor(private productService: ProductService,
    private carritoService: CarritoService,
    private router: Router) {

  }
  productos: Producto[] = new Array();
  costoTotal: number = 0;
  ngOnInit() {
    this.productos = this.carritoService.obtenerProductosCarrito();
    this.calcularCostoTotal();
   
  }

  calcularCostoTotal() {
    this.costoTotal = 0;
   
    this.productos.forEach((p) => {
      if (!Number.isNaN(p.precio) && p.precio != undefined) {
        this.costoTotal = Math.round((this.costoTotal + (p.precio * p.cantidad)) * 100) / 100;
      }
    })
    //verificamos si el carrito esta vacio para mostrar o no unos botones
    if (this.productos.length == 0) {
      this.carritoVacio = true;
    }
    else {
      this.carritoVacio = false;
    }
  }

  quitarProducto(p: Producto) {
    this.productos = this.carritoService.quitarProducto(p);
    if (this.productos.length == 0) {
      this.carritoVacio = true;
    }
    else {
      this.carritoVacio = false;
    }
    this.calcularCostoTotal();
  }

  agregarProducto(p: Producto) {
    this.carritoService.insertarProducto(p).then((r) => {
      if (r)
        this.productos = r;
      this.calcularCostoTotal();
    })
  }

  vaciarCarrito() {
    alert("Si compraste ya no hay marcha atras.");
    this.carritoService.vaciarCarrito();
    this.productos = [];
    this.costoTotal = this.costoTotal - this.costoTotal;
    this.carritoVacio = true;
  }


  volver() {
    this.router.navigate(['/']);
  }
  irAlCatalogo() {
    //TODO VER COMO HACER PARA QUE VAYA DEREHCO AL CATALOGO PORQUE LA
    //PAGINA DE INICIO PUEDE NO SER EL CATALOGO EN SI
    this.router.navigate(['/']);
  }

}
