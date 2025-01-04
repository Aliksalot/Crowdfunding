import { Component, ElementRef, ViewChild } from "@angular/core";
import { LogoComponent } from "../logo/logo.component";
import {ActivatedRoute} from "@angular/router";
import {Offer} from "@prisma/client";
import { Category, Country } from "../../../shared/enums/Categories";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  standalone: true,
  imports: [ LogoComponent, CommonModule ],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.css',
})
export class OfferComponent{

  categories = Category;
  locations = Country;

  offerId: number | undefined;
  offer: Offer | undefined;

  constructor(private route: ActivatedRoute, private http: HttpClient) {};

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.offerId = parseInt(params.get('id') || '0');
      this.http.put('/api/offer/findOne', { id: this.offerId }).subscribe({
        next: (offer) => {
          console.log(offer);
          if(offer){
            (offer as Offer).text = `${(offer as Offer).text}
              <style>
                .inner-content p{
                  text-wrap: wrap;
                }
              </style>
            `;
            this.offer = offer as Offer;
          }
        },
        error: (e) => {
          console.log(e);
        }
      });

    })
  }
}
