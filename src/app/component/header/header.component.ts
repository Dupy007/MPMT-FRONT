import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {
  }

  logout() {
    this.userService.SignOut().subscribe(() => {
    });
    this.router.navigate(['auth']);

  }

}
