import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service'; 

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const excludedUrls = ['/api/login', '/api/register']; // URL à exclure
    const logoutUrl = '/api/logout';
    const isExcluded = excludedUrls.some(url => req.url.includes(url));
    
    let authReq = req;
    if (!isExcluded) {
      const token = this.authService.getToken();
      
      if (token) {
        authReq = req.clone({
          setHeaders: { Authorization: token }
        });
      }
    }
  
  
    return next.handle(authReq).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          const newToken = event.headers.get('Authorization');
          if (newToken && newToken.startsWith('Bearer ')) {
            this.authService.setToken(newToken);
          }
        }
        // Supprimer le token après un logout réussi
        if (req.url.includes(logoutUrl)) {
          this.authService.clearToken();
        }
      })
    );
  }
  
}
