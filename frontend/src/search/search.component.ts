import { Component } from "@angular/core";
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from "@angular/common";
import { SelectModule } from "primeng/select";
import { MultiSelectModule } from "primeng/multiselect";

@Component({
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  imports: [ NavbarComponent, CommonModule, SelectModule, MultiSelectModule ],
})
export class SearchComponent{
}
