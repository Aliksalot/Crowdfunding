import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService{
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
        console.log(result);
        if(result){
          this.loggedInEmail = (result as [string, string])[0] as string;
          this.loggedInId = (result as [string, string])[1] as string;
          sessionStorage.setItem('e', this.loggedInEmail);
          sessionStorage.setItem('e_id', this.loggedInId as string);
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
    this.http.get('/logout');
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


}


