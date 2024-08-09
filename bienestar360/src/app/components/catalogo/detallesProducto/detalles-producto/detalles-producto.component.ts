import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { MenuComponent } from '../../../shared/menu/menu.component';
import { Router } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CarritoService } from '../../../../services/carrito.service';
import { Producto } from '../../../../models/producto';

 
@Component({
  selector: 'app-detalles-producto',
  standalone: true,
  imports: [MenuComponent, MatGridListModule, FooterComponent, MatButtonModule , MatExpansionModule, MatIconModule],
  templateUrl: './detalles-producto.component.html',
  styleUrl: './detalles-producto.component.css'
}) 
export class DetallesProductoComponent implements OnInit{
  producto: any | undefined;
  productos: Producto[] = new Array();
  constructor(private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private carritoService: CarritoService) {

  }

  ngOnInit() {
    var id = Number(this.route.snapshot.paramMap.get('id'));
    console.log("el id recibido", id)
    this.producto = this.productService.getProductById(id);
    console.log(this.producto)
  }

  async agregarAlCarrito(producto: Producto) {
    
    await this.carritoService.insertarProducto(producto)
      .then((productos) => {
        this.productos = productos;
        console.log("Cantidades:");
        this.productos.forEach((p) => {
          console.log(p.cantidad);
        });
      })
 
  }

  volver() {
    this.router.navigate(['/']);
  }

}
