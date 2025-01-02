import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Offer } from '@prisma/client';

import { ActivatedRoute } from '@angular/router';
import {LogoComponent} from '../logo/logo.component';
import {CommonModule} from '@angular/common';
import { EnumToArrayPipe } from '../../pipes/enum-to-array.pipe';
import { EditorModule } from 'primeng/editor';
import { FormsModule } from '@angular/forms';
import { Country, Category } from '@prisma/client';

@Component({
  standalone: true,
  imports: [CommonModule, LogoComponent, EnumToArrayPipe, EditorModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})

export class EditComponent {

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  offerId: number | undefined;
  offer: Offer | undefined;

  areChanges = false;

  countries = Country;
  categories = Category;

  ngOnInit(): void{
    this.route.queryParams.subscribe(params => {
      this.offerId = parseInt(params['id']);

      if(!this.offerId){ return }

      this.http.put('/api/offer/findOne', { id: this.offerId }).subscribe({
        next: (offer) => {
          console.log(offer);
          if(offer)
            this.offer = offer as Offer;
        },
        error: (e) => {
          console.log(e);
        }
      });
    })
  }

  saveChanges() {
    this.http.post(`/api/offer/${this.offerId}`, this.offer).subscribe({
      next: (result) => {
        console.log(result)
      },
      error: (error) => {
        console.log(error)
      }
    });
  }
}
