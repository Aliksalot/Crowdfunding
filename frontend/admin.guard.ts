import { Injectable } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if(this.authService.getIsAdmin()){
      return true;
    }else{
      window.alert("Тази страница е само за администратори!");
      return false;
    }
  }
}

