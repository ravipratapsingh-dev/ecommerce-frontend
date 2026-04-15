import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { AuthComponent } from './pages/auth/auth';
import { CartComponent } from './pages/cart/cart';
import { OrdersComponent} from './pages/orders/orders';
import { OrderDetailsComponent } from './pages/orders/order-details/order-details';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cart', component: CartComponent},
  { path: '' , component: AuthComponent},
  { path: 'orders' , component: OrdersComponent},
  { path: 'orders/:id', component: OrderDetailsComponent}
];