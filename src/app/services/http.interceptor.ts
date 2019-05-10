import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.auth.getAuthUser();
    if (user) {
      request = request.clone({
        headers: request.headers.set('Authorization', `${user.token_type} ${user.access_token}`)
        .set("Content-Type", "application/json")
      });
    } else {
      this.router.navigateByUrl("/login");
    }
    return next.handle(request).pipe(
    map((event: HttpEvent<any>) => event),
    catchError((error: HttpErrorResponse) => {
      let data = {};
      data = {
          reason: error && error.error.reason ? error.error.reason : '',
          status: error.status
      };
      return throwError(error);
    }));
  }
}
