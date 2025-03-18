import { Component } from "@angular/core";
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from "@angular/common";
import { SelectModule } from "primeng/select";
import { MultiSelectModule } from "primeng/multiselect";
import { FormsModule } from "@angular/forms";
import { EnumToArrayPipe } from "../../pipes/enum-to-array.pipe";
import {Sorts} from "../../../shared/enums/api";
import { Category, Country } from "../../../shared/enums/Categories";
import { ButtonModule } from 'primeng/button';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import { Prisma } from "@prisma/client";
import { LoopComponent } from "../loop/loop.component";
import { OfferWithRelations } from "../../../shared/types/extended-models";

@Component({
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  imports: [
    NavbarComponent,
    CommonModule,
    ButtonModule,
    SelectModule,
    MultiSelectModule,
    EnumToArrayPipe,
    FormsModule,
    LoopComponent
  ],
})
export class SearchComponent{

  results: OfferWithRelations[] = [];
  resultsTitle: OfferWithRelations[] = [];
  resultsText: OfferWithRelations[] = [];
  resultsAuthor: OfferWithRelations[] = [];

  sorts = Object.entries(Sorts).map(([key, val]) => ({ bg: val, enum: val }));
  categories = Object.entries(Category).map(([key, val]) => ({ bg: val, enum: key }));
  countries = Object.entries(Country).map(([key, val]) => ({ bg: val, enum: key }));

  constructor(private route: ActivatedRoute, private router: Router, private httpClient: HttpClient) {  };

  private _selectedCategories: Category[] = [];
  private _selectedCountries: Country[] = [];
  private _selectedSort: Sorts = Sorts.NEWEST;
  private _searchText: string | undefined;

  set selectedCategories(value: any){
    this._selectedCategories = value;
    this.route.queryParams.subscribe(params => {
      this.router.navigate(['/search'], { queryParams: { ...params, categories: value } })
    })
  }

  get selectedCategories(): Category[] {
    return this._selectedCategories;
  }

  set selectedCountries(value: any){
    console.log("setting countries to", value);
    this._selectedCountries = value;
    this.route.queryParams.subscribe(params => {
      this.router.navigate(['/search'], { queryParams: { ...params, countries: value } })
    })
  }
  get selectedCountries(): Country[] {

    return this._selectedCountries;
  }

  set selectedSort(value: any){
    this._selectedSort = value;
    this.route.queryParams.subscribe(params => {
      this.router.navigate(['/search'], { queryParams: { ...params, sort: value } })
    })
  }
  get selectedSort(): Sorts {
    return this._selectedSort;
  }

  get searchText(): string | undefined {
    return this._searchText;
  }
  set searchText(value: any) {
    this._searchText = value;
  }

  private search(search: Prisma.OfferWhereInput){

      if(this.selectedCategories.length > 0){
        search.category = {
          in: (this.selectedCategories) as unknown as any
        }
      }

      if(this.selectedCountries.length > 0){
        search.location = {
          in: (this.selectedCountries) as unknown as any
        }
      }

      let order = {};

      switch(this.selectedSort){
        case Sorts.ALPHABETIC: order = {title: 'desc' }; break;
        case Sorts.LEAST_FUNDED: order = { raised: 'asc' }; break;
        case Sorts.MOST_FUNDED: order = { raised: 'desc' }; break;
        case Sorts.NEWEST: order = { createdAt: 'desc' }; break;
        case Sorts.OLDEST: order = { createdAt: 'asc' }; break;
        default: console.error("Invalid sort");
      }

      return this.httpClient.post('/api/offer/findMany', { search, order });
  }

  private addUnique(arr1: OfferWithRelations[], arr2: OfferWithRelations[]){
    for(const offer of arr2){
      if(!arr1.find((of) => of.id === offer.id)){
        const diffInMili = Date.now() - new Date((offer as OfferWithRelations).createdAt).getTime();
        offer.daysSinceCreation = Math.floor(diffInMili / ( 1000 * 60 * 60 * 24 ));
        arr1.push(offer);
      }
    }
  }

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.results = [];
      this.resultsText = [];
      this.resultsTitle = [];
      this.resultsAuthor = [];

      this.searchText = (params['text']);
      if(params['categories']){
        this.selectedCategories = Array.isArray(params['categories'])
          ? params['categories']
          : [ params['categories'] ];

      }
      if(params['countries']){
        this.selectedCountries = Array.isArray(params['countries'])
          ? params['countries']
          : [ params['countries'] ];
      }

      if(params['sort']){
        this.selectedSort = params['sort'] || Sorts.NEWEST;
      }

      this.search({ title: { contains: this.searchText, mode: 'insensitive' } }).subscribe({
        next: (result) => {
          this.addUnique(this.resultsTitle, result as OfferWithRelations[]);
          this.addUnique(this.results, result as OfferWithRelations[]);
        }
      })

      this.search({ text: { contains: this.searchText, mode: 'insensitive' } }).subscribe({
        next: (result) => {
          this.addUnique(this.resultsText, result as OfferWithRelations[]);
          this.addUnique(this.results, result as OfferWithRelations[]);
        }
      })

      this.search({ user: { email: { contains: this.searchText, mode: 'insensitive' } } }).subscribe({
        next: (result) => {
          this.addUnique(this.resultsAuthor, result as OfferWithRelations[]);
          this.addUnique(this.results, result as OfferWithRelations[]);
        }
      })
    })
  }

  clearFilters() {
    window.location.href = '/search';
  }
}
