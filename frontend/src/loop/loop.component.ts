import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferWithRelations } from "../../../shared/types/extended-models";
import { OfferCompComponent } from "../offer-comp/offer-comp.component";

@Component({
  standalone: true,
  selector: "loop",
  imports: [ CommonModule, OfferCompComponent ],
  templateUrl: './loop.component.html',
  styleUrl: './loop.component.css',
})
export class LoopComponent{
  @Input() offers!: OfferWithRelations[];
}




