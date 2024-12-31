import {Component} from "@angular/core";
import {LogoComponent} from "../logo/logo.component";
import {RouterModule} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'home-navbar',
    imports: [LogoComponent, RouterModule, CommonModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})

export class NavbarComponent{

  isLoggedIn: boolean = false;

  constructor(authService: AuthService){
    this.isLoggedIn = !!authService.getLoggedInEmail()[0];
  }
}
