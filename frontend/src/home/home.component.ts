import {Component} from "@angular/core";
import {NavbarComponent} from "../navbar/navbar.component";
import { HttpClient } from "@angular/common/http";
import { OfferWithRelations } from "../../../shared/types/extended-models";
import { OfferCompComponent } from "../offer-comp/offer-comp.component";
import { LoopComponent } from "../loop/loop.component";

@Component({
  selector: 'home',
  imports: [ NavbarComponent, OfferCompComponent, LoopComponent ],
  templateUrl: '../home/home.component.html',
  styleUrl: '../home/home.component.css'
})

export class HomeComponent{

  loading: boolean = true;
  offers: OfferWithRelations[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(){
    this.http.get("/api/offer").subscribe({
      next: (result) => {
        this.offers = result as unknown as OfferWithRelations[];
        for(const offer of this.offers){
          const diffInMili = Date.now() - new Date((offer as OfferWithRelations).createdAt).getTime();
          offer.daysSinceCreation = Math.floor(diffInMili / ( 1000 * 60 * 60 * 24 ));
        }
        console.log(this.offers);
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = true;
        this.ngOnInit();
      }
    })
  }
}
