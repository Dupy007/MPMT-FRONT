import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    private userService: UserService,
    private AuthService:AuthService,
    private router: Router,
  ) {
  }

  logout() {
    this.userService.SignOut().subscribe(() => {
      if (this.AuthService.isLoggedIn){
        localStorage.removeItem('user');
      }
      this.router.navigate(['auth']);
      // window.location.reload();
    });

  }

}
