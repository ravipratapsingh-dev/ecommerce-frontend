import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {}

  addToCart(productId: number, quantity: number) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(
      `http://localhost:8080/cart/add?productId=${productId}&quantity=${quantity}`,
      {},
      { headers }
    );
  }

  getCart() {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(
      'http://localhost:8080/cart',
      { headers }
    );
  }

  removeFromCart(id: number) {
  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.delete(
    `http://localhost:8080/cart/remove/${id}`,
    { headers }
  );
}

clearCart() {
  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.delete(
    'http://localhost:8080/cart/clear',
    { headers }
  );
}
}
