import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})


export class ProductComponent implements OnInit {
 
  productos: any[] = new Array();
  item: any = null;
  constructor(private productService: ProductService,
    private router: Router) { }
  

  ngOnInit(): void  {
    
    this.productos = this.productService.getProducts();
 


  }
  verDetalles(articulo: any) {
    
    // Navegar a DetalleArticuloComponent y pasar el ID del artículo como parámetro
    this.router.navigate(['/detalle', articulo.id]);
  }

  
}
