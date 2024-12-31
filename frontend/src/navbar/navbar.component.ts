import {Component} from "@angular/core";
import {LogoComponent} from "../logo/logo.component";
import {RouterModule} from "@angular/router";

@Component({
    selector: 'home-navbar',
    imports: [LogoComponent, RouterModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})

export class NavbarComponent{

}
