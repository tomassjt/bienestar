import { Routes } from '@angular/router';
import { DetallesProductoComponent } from './components/catalogo/detallesProducto/detalles-producto/detalles-producto.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { LoginComponent } from './components/shared/login/login.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { RegistrarComponent } from './components/shared/registrar/registrar.component';

export const routes: Routes = [
  {
    path: '', component: MenuComponent
  },

  {
    path: 'detalle/:id', component: DetallesProductoComponent
  },
  {
    path: 'admin', component: AdministracionComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'registrar', component: RegistrarComponent
  },
  {
    path: 'carrito', component: CarritoComponent
  }

];
