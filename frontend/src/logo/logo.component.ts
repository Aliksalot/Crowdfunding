import {Component} from "@angular/core";
import {RouterModule} from "@angular/router";

@Component({
    selector: 'logo',
    imports: [RouterModule],
    template: `
    <a routerLink='/'>
      <img src='../assets/images/logo.png' class='logo-img'/>
    </a>
  `,
    styles: `
    a{
      cursor: pointer
    }
  `
})

export class LogoComponent{ }
