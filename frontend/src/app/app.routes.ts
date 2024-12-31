import { Routes } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { HomeComponent } from '../home/home.component';
import { CreateComponent } from '../create/create.component';
import {AuthGuard} from '../../auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent },
  { path: 'initialize', component: CreateComponent, canActivate: [AuthGuard] }
];
