import { Component } from "@angular/core";
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from "@angular/common";
import { SelectModule } from "primeng/select";
import { MultiSelectModule } from "primeng/multiselect";
import { FormsModule } from "@angular/forms";
import { EnumToArrayPipe } from "../../pipes/enum-to-array.pipe";
import {Sorts} from "../../../shared/enums/api";
import { Category, Country } from "../../../shared/enums/Categories";

@Component({
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  imports: [ NavbarComponent, CommonModule, SelectModule, MultiSelectModule, EnumToArrayPipe, FormsModule],
})
export class SearchComponent{
  sorts = Object.entries(Sorts).map(([key, val]) => val)
  categories = Object.entries(Category).map(([key, val]) => val);
  countries = Object.entries(Country).map(([key, val]) => val);

  private _selectedCategories: string[] = [];

  set selectedCategories(value: any){
    this._selectedCategories = value;
    console.log(value);
  }

  get selectedCategories(): string[] {
    return this._selectedCategories;
  }

  private _selectedCountries: string[] = [];

  set selectedCountries(value: any){
    this._selectedCountries = value;
    console.log(value);
  }
  get selectedCountries(): string[] {
    return this._selectedCountries;
  }
  private _selectedSort: string = 'Най-нови';

  set selectedSort(value: any){
    this._selectedSort = value;
    console.log(value);
  }
  get selectedSort(): string {
    return this._selectedSort;
  }

  ngOnInit(){
    console.log(this.sorts);
  }
}
