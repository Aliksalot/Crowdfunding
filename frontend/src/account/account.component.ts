import {LogoComponent} from "../logo/logo.component";
import {  Offer } from '@prisma/client';
import { Category, Country } from '../../../shared/enums/Categories';
import { HttpClient } from '@angular/common/http';
import {Component} from "@angular/core";
import {RouterModule, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-acccount',
    standalone: true,
    imports: [LogoComponent, RouterModule, CommonModule, LogoComponent],
    templateUrl: './account.component.html',
    styleUrl: './account.component.css'
})

export class AccountComponent{

  showDeletePopupForId: number | undefined;

  Categories = Category;
  Countries = Country;


  userEmail: string = '';
  userId: number = 0;

  usersOffers: Offer[] = [];

  constructor(private authService: AuthService, private http: HttpClient, private router: Router){
    [this.userEmail, this.userId] = authService.getLoggedInEmail();

    this.http.post('/api/offer/findMany', { creator: this.userId }).subscribe({
      next: (result) => {
        console.log(result);
        if(result){
          this.usersOffers = result as Offer[];
        }

      }
    })
  }

  delete(id: number){

    this.http.post('/api/offer/delete', { id }).subscribe({
      next: () => {
        this.usersOffers = this.usersOffers.filter((val) => val.id !== id);
        this.showDeletePopupForId = undefined;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  showDeletePopup(id: number) {
    console.log(id);
    this.showDeletePopupForId = id;
  }

  navigateToEdit(id: number) {
    this.router.navigateByUrl(`/edit?id=${id}`);
  }

  logout() {
    this.authService.logout();
  }
}
