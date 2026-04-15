import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/OrderService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.html',
  imports: [CommonModule],
  styleUrls: ['./order-details.css']
})
export class OrderDetailsComponent implements OnInit {

  order: any = null;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private cdr: ChangeDetectorRef   // 🔥 IMPORTANT
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    console.log("ORDER ID:", id);

    this.orderService.getOrderById(id).subscribe({
      next: (res: any) => {
        console.log("DETAIL RESPONSE:", res);

        this.order = res.data;

        console.log("ORDER SET:", this.order);

        this.cdr.detectChanges();   // 🔥 FORCE UI UPDATE
      },
      error: (err) => {
        console.log("ERROR:", err);
      }
    });
  }
}