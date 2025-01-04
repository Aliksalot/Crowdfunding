import {CommonModule} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PaymentStatus, PaymentStatusColor } from "../../../shared/enums/api";


@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './payment.module.html',
  styleUrl: './payment.module.css',
})
export class PaymentComponent implements OnInit{

  constructor(private route: ActivatedRoute, private http: HttpClient){ }

  paymentStatus: PaymentStatus = PaymentStatus.AWAITING;

  PaymentStatus = PaymentStatus;
  PaymentStatusColor = PaymentStatusColor;

  countdownValue: number = 3;

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      const offerId = parseInt(params['offerId']);
      const value = parseInt(params['value']);
      this.http.put('/api/offer/fund', { offerId, value }).subscribe({
        next: (response) => {
          this.paymentStatus = (response as any).status;
          window.setTimeout(() => this.countdown(), 1000);
        },
        error: (error) => {
          console.log(error);
        },
      })
    })
  }

  countdown(){
    console.log('call', this.countdownValue);

    if(this.countdownValue <= 0){
      window.close();
    }

    window.setTimeout(() => this.countdown(), 1000);
    this.countdownValue --;
  }

}
