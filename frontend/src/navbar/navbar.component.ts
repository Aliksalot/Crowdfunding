import {Component} from "@angular/core";
import {LogoComponent} from "../logo/logo.component";
import {RouterModule} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Category } from "../../../shared/enums/Categories";


@Component({
    selector: 'home-navbar',
    standalone: true,
    imports: [LogoComponent, RouterModule, CommonModule, FormsModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})

export class NavbarComponent{


  categories = Object.entries(Category).map(([key, val]) => ({ bg: val, enum: key }));

  randCategory = () => this.categories[Math.floor(Math.random() * this.categories.length)];

  isLoggedIn: boolean = false;

  searchText: string = '';

  constructor(authService: AuthService, private router: Router, private httpClient: HttpClient){
    this.isLoggedIn = !!authService.getLoggedInEmail()[0];
  }

  onSubmit(form: NgForm){
    console.log(this.searchText);


    if(this.searchText){
      this.router.navigate([`/search`], { queryParams: { text: this.searchText }});
    }

    form.reset();
  }


}
