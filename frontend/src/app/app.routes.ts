import { Routes } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { HomeComponent } from '../home/home.component';
import { CreateComponent } from '../create/create.component';
import { AccountComponent } from '../account/account.component';
import { EditComponent } from '../edit/edit.component';

import {AuthGuard} from '../../auth.guard';
import {OfferComponent} from '../offer/offer.component';
import {PaymentComponent} from '../payment/payment.module';
import {AdminComponent} from '../admin/admin.component';
import {AdminGuard} from '../../admin.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent },
  { path: 'offer/:id', component: OfferComponent },

  { path: 'initialize', component: CreateComponent, canActivate: [AuthGuard] },
  { path: 'account', component: AccountComponent , canActivate: [AuthGuard] },
  { path: 'edit', component: EditComponent, canActivate: [AuthGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard] },
];
