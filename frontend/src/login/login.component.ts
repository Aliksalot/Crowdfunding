import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserStatus } from '../../../shared/enums/api';
import {LogoComponent} from '../logo/logo.component';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, ReactiveFormsModule, LogoComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
@Injectable({
  providedIn: 'root'
})
export class LoginComponent {
  form: FormGroup

  isSubmited = false;

  isEmailTaken = false;

  constructor(private http: HttpClient, private fb: FormBuilder, private authService: AuthService) {

    this.form = fb.group({
      pass: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],
      email: [
        '',
        [
          Validators.email,
          Validators.required,
        ]
      ],
    })
  }

  onSubmit(){
    this.isSubmited = true;
    const email = this.form.get('email'), pass = this.form.get('pass');
    if(email?.valid && pass?.valid){
      this.authService.login(email.value, pass.value);
    }
  }

  onChange(){
    this.isSubmited = false;
    this.isEmailTaken = false;
  }
}
