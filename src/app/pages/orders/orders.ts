import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OrderService } from '../../services/OrderService';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.html',
  styleUrls: ['./orders.css'],
  imports: [CommonModule]
})
export class OrdersComponent implements OnInit {

  orders: any[] = [];

  constructor(
    private orderService: OrderService,
    private cdr: ChangeDetectorRef,  // ✅ IMPORTANT
    private router : Router
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getMyOrders().subscribe({
      next: (res: any) => {
        console.log("API RESPONSE:", res);

        this.orders = res.data || [];

        console.log("ORDERS SET:", this.orders);

        this.cdr.detectChanges();   // 🔥 FORCE UI UPDATE
      },
      error: (err) => {
        console.log("ERROR:", err);
        this.orders = [];
      }
    });
  }

  cancelOrder(orderId: number) {

  const confirmCancel = confirm("Are you sure you want to cancel this order?");

  if (!confirmCancel) return;

  this.orderService.updateOrderStatus(orderId, "CANCELLED")
    .subscribe({
      next: (res: any) => {
        alert("Order cancelled successfully ❌");

        // ✅ refresh orders list
        this.loadOrders();
      },
      error: (err) => {
        console.log("CANCEL ERROR:", err);
        alert("Failed to cancel order");
      }
    });
}

viewDetails(orderId: number){
  this.router.navigate(['/orders', orderId]);
}
}