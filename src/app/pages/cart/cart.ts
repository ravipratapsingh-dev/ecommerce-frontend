import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ChangeDetectorRef } from '@angular/core';
import { OrderService } from '../../services/OrderService';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // 🔥 ADD

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];

  address: string = '';
  state: string = '';

  // 🔥 NEW FLAG
  showOrderSuccess = false;

  states: string[] = [
    "Delhi","Haryana","Uttar Pradesh","Punjab","Rajasthan",
    "Maharashtra","Gujarat","Bihar","West Bengal","Karnataka",
    "Tamil Nadu","Kerala","Madhya Pradesh","Odisha","Assam"
  ];

  paymentMethod: string = 'COD';

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private cd: ChangeDetectorRef,
    private router: Router // 🔥 ADD
  ){}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe({
      next: (res: any) => {
        console.log("CART RAW:", res);

        this.cartItems = (res?.data || []).map((item: any) => ({
          id: item.id,
          name: item.product?.name,
          price: item.product?.price,
          quantity: item.quantity
        }));

        this.cd.detectChanges();
        console.log("CART FINAL:", this.cartItems);
      },
      error: (err) => {
        console.log("CART ERROR:", err);
      }
    });
  }

  // REMOVE ITEM
  remove(id: number) {
    this.cartService.removeFromCart(id).subscribe({
      next: () => {
        console.log("Removed:", id);
        this.loadCart();
      },
      error: (err) => {
        console.log("REMOVE ERROR:", err);
      }
    });
  }

  // CLEAR CART
  clearCart() {
    this.cartService.clearCart().subscribe({
      next: () => {
        alert("Cart cleared ");
        this.loadCart();
      },
      error: (err) => {
        console.log("CLEAR ERROR:", err);
      }
    });
  }

  // 🔥 PLACE ORDER UPDATED
  placeOrder() {

  if (!this.address || !this.state) {
    alert("Please enter address and select state ❗");
    return;
  }

  const fullAddress = this.address + ", " + this.state;

  this.orderService.placeOrder(fullAddress, this.paymentMethod)
    .subscribe({
      next: (res: any) => {
        console.log("ORDER SUCCESS");

        // 🔥 DIRECT SHOW
        this.showOrderSuccess = true;

        // 🔥 clear cart UI
        this.cartItems = [];
      },
      error: (err) => {
        console.log("ORDER ERROR:", err);
      }
    });
}


  // 🔥 NAVIGATE
  goToOrders() {
    this.router.navigate(['/orders']);
  }

  getTotal() {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
}