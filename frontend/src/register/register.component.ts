import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserStatus } from '../../../shared/enums/api';
import { Register } from './register';
import {LogoComponent} from '../logo/logo.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, ReactiveFormsModule, LogoComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  form: FormGroup

  isSubmited = false;

  isEmailTaken = false;

  constructor(private http: HttpClient, private fb: FormBuilder) {

    this.form = fb.group({
      pass: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],
      passConfirm: [
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
    const email = this.form.get('email'), pass = this.form.get('pass'), passConfirm = this.form.get('passConfirm');
    if(email?.valid && pass?.valid && passConfirm?.valid && pass.value === passConfirm.value){
      this.http.post('/api/user/register', { email: email.value, password: pass.value }).subscribe({
        next: (result) => {
          switch((result as any).status as UserStatus){
            case UserStatus.CREATED: //TODO redirect
              break;
            case UserStatus.EMAIL_TAKEN:
              this.isEmailTaken = true;
              break;
            case UserStatus.PASSWORD_INVALID: break;
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  onChange(){
    this.isSubmited = false;
    this.isEmailTaken = false;
  }
}

