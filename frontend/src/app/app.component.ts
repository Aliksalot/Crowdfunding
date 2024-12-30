import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private http: HttpClient) {}

  ngOnInit(){
    console.log('init')
    this.doRequest();
  }

  doRequest(){

    this.http.post('/api/user/login', { email: 'alexkolev05@gmail.com', passwordAttempt: 'password' })
    .subscribe({
      next: (response) => {
        console.log(response);
      }
    })
  }

  title = 'crowdfundit';
}
