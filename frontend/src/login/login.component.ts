import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserStatus } from '../../../shared/enums/api';
import { Router } from '@angular/router';
import {LogoComponent} from '../logo/logo.component';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-root',
    imports: [FormsModule, CommonModule, ReactiveFormsModule, LogoComponent],
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

  constructor(private http: HttpClient, private fb: FormBuilder, private authService: AuthService, private router: Router) {

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
      this.authService.login(email.value, pass.value).subscribe({
        next: () => {
          this.router.navigate(['/account']);
        }
      });
    }
  }

  onChange(){
    this.isSubmited = false;
    this.isEmailTaken = false;
  }
}
