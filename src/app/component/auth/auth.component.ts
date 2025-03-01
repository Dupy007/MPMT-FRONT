import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  email: string = '';
  password: string = '';
  username: string = '';

  constructor(private userService: UserService, private router: Router) {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (this.isLoginMode) {
      let login = {email: this.email, password: this.password}
      this.userService.login(login).subscribe(
        res => {
          localStorage.setItem('user', JSON.stringify(res));
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Login failed', error);
        }
      );
    } else {
      this.userService.register({email: this.email, password: this.password, username: this.username}).subscribe(
        res => {
          localStorage.setItem('user', JSON.stringify(res));
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Registration failed', error);
        }
      );
    }
  }
}
