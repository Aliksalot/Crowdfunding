import { CreateModel } from './create';
import { Component } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import {NavbarComponent} from "../navbar/navbar.component";
import { Category, Country } from "../../../shared/enums/Categories";
import {LogoComponent} from "../logo/logo.component";
import {EnumToArrayPipe} from "../../pipes/enum-to-array.pipe";

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, LogoComponent, EnumToArrayPipe],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent{
  countries = Country;
  categories = Category;

  isContinueAllowed = false;
  isContinued = false;

  text = '';

  close(){
    console.log('asd');
  }

  model: CreateModel = {
    category: undefined,
    location: undefined,
    title: undefined,
    money: undefined
  }

  onStepOneInput(){
    console.log('call');
    this.isContinueAllowed = !!(this.model.category && this.model.money && this.model.location);
  }

  _continue(){
    this.isContinued = true;
  }
}
