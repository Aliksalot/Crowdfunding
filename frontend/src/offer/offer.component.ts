import { AfterViewInit, Component, ElementRef, HostListener, OnChanges, SimpleChange, SimpleChanges, ViewChild } from "@angular/core";
import { LogoComponent } from "../logo/logo.component";
import {ActivatedRoute, Router} from "@angular/router";
import { OfferWithRelations, CommentWithRelations } from '../../../shared/types/extended-models';
import { CommentInputComponent } from "../components/comment-input/comment-input.component";
import { CommentListComponent } from "../components/comment-list/comment-list.component";
import { Category, Country } from "../../../shared/enums/Categories";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  standalone: true,
  imports: [ LogoComponent, CommonModule, CommentInputComponent, CommentListComponent, FormsModule ],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.css',
})
export class OfferComponent {

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {};

  @ViewChild('achievedLine') achievedLineElement!: ElementRef<HTMLDivElement>;
  @ViewChild('goalLine') goalLineElement!: ElementRef<HTMLDivElement>;


  categories = Category;
  locations = Country;

  offerId: number | undefined;
  isOfferDefined: boolean = false;
  daysSinceOfferCreation: number = 0;

  shouldShowPaymentPopup: boolean = false;
  valueToPay: number | undefined;

  setShouldShowPaymentPopup(new_state: boolean): void{
    this.shouldShowPaymentPopup = new_state;
    if(new_state){
      document.body.classList.add('no-scroll');
    }else{
      document.body.classList.remove('no-scroll');
      this.valueToPay = undefined;
    }
  }

  goToPayment(): void{
    if(!this.valueToPay) return;

    const newWindow = window.open(`/payment?value=${this.valueToPay}&offerId=${this.offerId}`, "_blank");
    const checkWindowClosed = setInterval(() => {
      if(newWindow && newWindow.closed){
        clearInterval(checkWindowClosed);
        window.location.reload();
      }
    }, 250)
    this.setShouldShowPaymentPopup(false);
  }

  private offer: OfferWithRelations | undefined;

  getOffer() {
    return this.offer;
  }
  setOffer(offer: OfferWithRelations){
    this.offer = offer;
    this.isOfferDefined = true;

    window.setTimeout(() => {
      this.resizeLine();
    }, 1);
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.offerId = parseInt(params.get('id') || '0');
      this.http.put('/api/offer/findOne', { id: this.offerId }).subscribe({
        next: (offer) => {
          if(offer !== undefined){
            const diffInMili = Date.now() - new Date((offer as OfferWithRelations).createdAt).getTime();
            this.daysSinceOfferCreation = Math.floor(diffInMili / ( 1000 * 60 * 60 * 24 ));
            this.setOffer(offer as OfferWithRelations);
          }
        },
        error: (e) => {
          console.log(e);
        }
      });
    })
  }

  @HostListener('window:resize', ['$event'])
  resizeLine(): void{
    if(!this.offer) return;

    const targetWidth = this.goalLineElement.nativeElement.clientWidth;
    const newWidthForAchieved = Math.round((Math.min(this.offer.raised, this.offer.goal) / this.offer.goal) * targetWidth);
    this.achievedLineElement.nativeElement.style.width = newWidthForAchieved + 'px';
    //triget animation
    this.achievedLineElement.nativeElement.classList.add('animate');

    this.achievedLineElement.nativeElement.addEventListener('animationend', () => {
      this.achievedLineElement.nativeElement.classList.remove('animate');
    })
  }
}
