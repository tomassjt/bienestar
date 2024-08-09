import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../components/shared/menu/menu.component';
import { DetallesProductoComponent } from '../components/catalogo/detallesProducto/detalles-producto/detalles-producto.component';
import { IniciarSesionComponent } from '../components/login/iniciar-sesion/iniciar-sesion.component';
import { CarritoComponent } from '../components/carrito/carrito.component';
import { AdministracionComponent } from '../components/administracion/administracion.component';


const routes: Routes = [
  {
    path: '', component: MenuComponent
  },

  {
    path: 'detalle/:id', component: DetallesProductoComponent
  },

  {
    path: 'carrito', component: CarritoComponent
  },
  {
    path: 'admin', component: AdministracionComponent
  },


  {
    path: 'login', component: IniciarSesionComponent
  }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes),
    CommonModule
  ]
})

export class AppRoutingModule { }
