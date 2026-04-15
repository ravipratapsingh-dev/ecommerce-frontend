import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private base = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    console.log('TOKEN:', token);

    if (!token) {
      throw new Error('No token in localStorage');
    }

    return new HttpHeaders({
      Authorization: `Bearer ${token}`  // ✅ backticks (CRITICAL)
    });
  }

  placeOrder(address: string, paymentMethod: string) {
    const headers = this.getAuthHeaders();

    const body = {
      address,
      paymentMethod
    };

    return this.http.post(
      `${this.base}/order/place`,
      body,
      { headers }
    );
  }

  getMyOrders() {
    const headers = this.getAuthHeaders();

    return this.http.get(
      `${this.base}/order/my`,
      { headers }
    );
  }

  updateOrderStatus(orderId: number, status: string) {
    const token = localStorage.getItem('token');
  return this.http.put(`http://localhost:8080/order/${orderId}/status`, {
    status: status},
    {
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
  );
}

getOrderById(id: number){
    const token = localStorage.getItem('token');
    console.log("TOKEN FROM STORAGE:", token);
  return this.http.get(`http://localhost:8080/order/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }); 
}
}
