import { CreateModel } from './create';
import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import {NavbarComponent} from "../navbar/navbar.component";
import { Category, Country } from "../../../shared/enums/Categories";
import {LogoComponent} from "../logo/logo.component";
import {EnumToArrayPipe} from "../../pipes/enum-to-array.pipe";
import { EditorModule } from 'primeng/editor';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, LogoComponent, EnumToArrayPipe, EditorModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent{
  countries = Country;
  categories = Category;

  isContinueAllowed = false;
  isContinued = false;

  isCreateAllowed = false;

  model: CreateModel = {
    category: undefined,
    location: undefined,
    title: undefined,
    money: undefined,
    cover: undefined,
    text: undefined,
  }

  handleCoverUpload(event: Event): void{
    const input = event.target as HTMLInputElement;

    if(!input.files || input.files?.length <= 0){ return; }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      if(result){
        this.model.cover = result;
      }
    }

    reader.onerror = () => {
      //TODO show error message
      console.log('error with reading image');
    }

    reader.readAsDataURL(file);

  }

  onStepTwoInput() {
    this.isCreateAllowed = true;
    for(const key in this.model){
      console.log((this.model as any)[key]);
      if(!(this.model as any)[key]){
        this.isCreateAllowed = false;
      }
    }
  }

  onStepOneInput(){
    this.isContinueAllowed = !!(this.model.category && this.model.money && this.model.location);
  }


  goBack(){
    this.isContinued = false;
  }
  _continue(){
    this.isContinued = true;
  }
}
