import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService{
  private loggedInEmail: string | undefined | null = undefined;

  constructor(private http: HttpClient, private router: Router) {};

  loginWOPass() {
    this.http.get('/api/user').subscribe({
      next: (response) => {
        this.loggedInEmail = (response as any).email;
        sessionStorage.setItem('e', this.loggedInEmail as string);
      }
    })
  }

  login(email: string, passwordAttempt: string): Observable<any>{
    const request = this.http.post('/api/user/login', { email, passwordAttempt });
    request.subscribe({
      next: (result) => {
        console.log(result);
        if(result){
          this.loggedInEmail = result as string;
          sessionStorage.setItem('e', this.loggedInEmail);
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

  getLoggedInEmail(){
    if(this.loggedInEmail === undefined){
      this.loggedInEmail = sessionStorage.getItem('e') === undefined ? null : sessionStorage.getItem('e');
    }

    return this.loggedInEmail;
  }


}


