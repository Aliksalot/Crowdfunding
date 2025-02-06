import { Component } from "@angular/core";
import {LogoComponent} from "../logo/logo.component";
import {Offer, OfferWithRelations} from "../../../shared/types/extended-models";
import { Category, Country } from "../../../shared/enums/Categories";
import { HttpClient } from "@angular/common/http";
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  templateUrl: "./admin.component.html",
  styleUrls: [ "./admin.component.css" ],
  imports: [LogoComponent, CommonModule],
})
export class AdminComponent{

  Categories = Category;
  Countries = Country;
  loading = true;
  offers: OfferWithRelations[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(){
    this.http.get('/api/offer').subscribe({
      next: (result) => {
        console.log(result);
        this.offers = result as OfferWithRelations[];
      },
      error: (error: any) => {
        console.log(error);
        this.ngOnInit();
      }
    })
  }

  delete(id: number){
    this.http.post('/api/offer/delete', { id }).subscribe({
      next: () => {
        this.offers = this.offers.filter((val) => val.id !== id);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  approve(id: number){
    this.http.put('/api/offer/approve', { id }).subscribe({
      next: (response) => {
        console.log(response);
        const offer = this.offers.find((offer) => offer.id === id);
        if(offer){
          offer.approved = true;
        }
      },
      error: (err) => {
        console.log(err);
      }
    })

  }


}
