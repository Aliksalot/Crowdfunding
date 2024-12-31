import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(){
    this.authService.loginWOPass();
  }

  title = 'crowdfundit';
}
