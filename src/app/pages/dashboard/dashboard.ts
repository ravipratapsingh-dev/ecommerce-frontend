import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  products: any[] = [];
  cartItems: any[] = [];
  cartCount: number = 0;

  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}

  // 🔥 INIT
  ngOnInit(): void {
    this.loadProducts();
    this.loadCart();
    setTimeout(() => {
      console.log("AFTER LOAD:" , this.products);
    }, 500);
  }

  goToCart(){
    this.router.navigate(['/cart']);
  }

  // 🔥 LOAD PRODUCTS
  loadProducts() {
    this.http.get('http://localhost:8080/products').subscribe({
      next: (res: any) => {
        console.log("DATA:", res.data);

        // ✅ FIX (important)
        this.products = res.data;

        this.cd.detectChanges();

        console.log("AFTER SET:", this.products);
      },
      error: (err) => {
        console.log("ERROR:", err);
      }
    });
  }

  // 🔥 LOAD CART
  loadCart() {
    this.cartService.getCart().subscribe({
      next: (res: any) => {
        console.log("CART RESPONSE:", res);

        this.cartItems = res?.data || [];
        this.cartCount = this.cartItems.reduce(
          (total: number, item: any) => {
            return total + (item.quantity || 1);
      },0
    );
  },
      error: (err) => {
        console.log("CART ERROR:", err);
      }
    });
  }

  // 🔥 ADD TO CART
  addToCart(productId: number) {
    this.cartService.addToCart(productId, 1).subscribe({
      next: () => {
        setTimeout(() => {
        this.loadCart();
      }, 300);
    },
      error: (err) => {
        console.log("ADD CART ERROR:", err);
        alert("Add to cart failed ❌");
      }
    });
  }

  // 🔥 IMAGE FUNCTION (FIXED)
  getImage(name: string) {
    if (!name) return 'https://via.placeholder.com/150';

    name = name.toLowerCase();

    if (name.includes('shoe')) {
      return 'https://images.unsplash.com/photo-1542291026-7eec264c27ff';
    }

    if (name.includes('watch')) {
      return 'https://images.unsplash.com/photo-1524592094714-0f0654e20314';
    }

    if (name.includes('headphone')) {
      return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e';
    }

    return 'https://via.placeholder.com/150';
  }
}
