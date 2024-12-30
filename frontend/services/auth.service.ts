import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService{
  private loggedInEmail: string | null  = null;
  private previousRoute: string = '';

  constructor(private http: HttpClient, private router: Router) {};

  login(email: string, passwordAttempt: string): Observable<any>{
    const request = this.http.post('/api/user/login', { email, passwordAttempt });
    request.subscribe({
      next: (result) => {
        console.log(result);
        if(result){
          this.loggedInEmail = result as string;
          const temp = this.previousRoute;
          this.previousRoute = '';
          this.router.navigate([temp]);
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
    this.previousRoute = this.router.url;
    return this.loggedInEmail;
  }


}


