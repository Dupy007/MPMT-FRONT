import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return (user !== null);
  }
  get token(): any {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user !== null) {
      return user['token'];
    }
  }
}
