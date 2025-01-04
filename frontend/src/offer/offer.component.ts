import { Component, ElementRef, ViewChild } from "@angular/core";
import { LogoComponent } from "../logo/logo.component";
import {ActivatedRoute} from "@angular/router";
import { OfferWithRelations, CommentWithRelations } from '../../../shared/types/extended-models';
import { CommentInputComponent } from "../components/comment-input/comment-input.component";
import { CommentListComponent } from "../components/comment-list/comment-list.component";
import { Category, Country } from "../../../shared/enums/Categories";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  standalone: true,
  imports: [ LogoComponent, CommonModule, CommentInputComponent, CommentListComponent ],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.css',
})
export class OfferComponent{

  categories = Category;
  locations = Country;

  offerId: number | undefined;
  offer: OfferWithRelations | undefined;

  constructor(private route: ActivatedRoute, private http: HttpClient) {};

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.offerId = parseInt(params.get('id') || '0');
      this.http.put('/api/offer/findOne', { id: this.offerId }).subscribe({
        next: (offer) => {
          console.log(offer);
          if(offer !== undefined){

            this.offer = offer as OfferWithRelations;
          }
        },
        error: (e) => {
          console.log(e);
        }
      });

    })
  }
}
