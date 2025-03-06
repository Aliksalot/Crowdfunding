import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { UserRole } from '../../shared/enums/api';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService{
  private isAdmin: boolean | undefined | null = undefined;
  private loggedInEmail: string | undefined | null = undefined;
  private loggedInId: string | undefined | null = undefined;

  constructor(private http: HttpClient, private router: Router) {};

  loginWOPass() {
    this.http.get('/api/user').subscribe({
      next: (result) => {
        this.loggedInEmail = (result as [string, string])[0] as string;
        this.loggedInId = (result as [string, string])[1] as string;
        sessionStorage.setItem('e', this.loggedInEmail as string);
        sessionStorage.setItem('e_id', this.loggedInId as string);
      }
    })
  }

  login(email: string, passwordAttempt: string): Observable<any>{
    const request = this.http.post('/api/user/login', { email, passwordAttempt });
    request.subscribe({
      next: (result) => {
        if(result){
          this.loggedInEmail = (result as [string, string])[0] as string;
          this.loggedInId = (result as [string, string])[1] as string;
          this.isAdmin = (result as [string, string, boolean])[2] as boolean;
          sessionStorage.setItem('e', this.loggedInEmail);
          sessionStorage.setItem('e_id', this.loggedInId as string);
          if(this.isAdmin){
            sessionStorage.setItem('e_role', UserRole.ADMIN);
          }else{
            sessionStorage.setItem('e_role', UserRole.USER);
          }
        }else{
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        this.router.navigate(['/login']);
      }
    })
    return request;
  }

  logout(){
    this.loggedInEmail = '';
    sessionStorage.removeItem('e');
    sessionStorage.removeItem('e_id');
    sessionStorage.removeItem('e_role');
    this.http.get('/logout');
    this.router.navigate(['/']);
  }

  getLoggedInEmail(): [string, number]{
    if(this.loggedInEmail === undefined){
      this.loggedInEmail = sessionStorage.getItem('e') === undefined ? null : sessionStorage.getItem('e');
    }

    if(this.loggedInId === undefined){
      this.loggedInId = sessionStorage.getItem('e_id') === undefined ? null : sessionStorage.getItem('e_id');
    }

    return [this.loggedInEmail || '', parseInt(this.loggedInId || '0') || 0];
  }

  getIsAdmin(): boolean {
    console.log("Is user admin", sessionStorage.getItem('e_role') ? sessionStorage.getItem('e_role') : "bye");
    if(this.isAdmin === undefined){
      this.isAdmin = sessionStorage.getItem('e_role') === undefined ? null : sessionStorage.getItem('e_role') === UserRole.ADMIN;
    }
    return this.isAdmin || false;
  }

}


