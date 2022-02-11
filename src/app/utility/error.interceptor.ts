import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401 && this.authService.checkTimestamp()) {   //5秒内不重复处理
        //401	Unauthorized	请求要求用户的身份认证
        //auto logout if 401 response returned from api
        this.authService.logout();
        location.replace("/login");
        alert("The request requires user authentication.");
      } else if (err.status === 403) {
        //403	Forbidden	服务器理解请求客户端的请求，但是拒绝执行此请求
        alert("发出的请求不在授权范围内!");
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}
