import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false if no user is logged in', () => {
    localStorage.removeItem('user');
    expect(service.isLoggedIn).toBeFalse();
  });

  it('should return true if a user is logged in', () => {
    localStorage.setItem('user', JSON.stringify({ email: 'test@example.com' }));
    expect(service.isLoggedIn).toBeTrue();
  });
});