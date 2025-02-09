import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferWithRelations } from "../../../shared/types/extended-models";
import { LoopComponent } from "../loop/loop.component";

@Component({
  standalone: true,
  selector: "offer",
  imports: [ CommonModule ],
  templateUrl: './offer-comp.component.html',
  styleUrl: './offer-comp.component.css',
})
export class OfferCompComponent{
  @Input() offer!: OfferWithRelations;
}




