import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { HandleHttpErrorService } from './handle-http-error.service';
import { ParameterApiStru } from '../../models/api/parameter-api-stru';

@Injectable()
export class EmailService {

  constructor(
    private http: HttpClient,
    private handleHttpErrorService: HandleHttpErrorService,
  ) { }

  apiUrl: string = environment.apiServerUrl;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  verifyEmailByLink(userId: number, link: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/h/${userId}?dt=verifyemail&link=${link}`).pipe(
      catchError(this.handleHttpErrorService.handleError<number>(`EmailService: verifyEmailByLink link=${link}`))
    );
  }

  verifyEmailByCode(userId: number, code: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/hs/${userId}?dt=verifyemail&code=${code}`).pipe(
      catchError(this.handleHttpErrorService.handleError<number>(`EmailService: verifyEmailByLink code=${code}`))
    );
  }

  sendVerificationCode(userId: number, typeId: number, email: string): Observable<string> {
    let paras: ParameterApiStru = { id: 0, intPara1: userId, intPara2: typeId, strPara1: email }
    const url = `${this.apiUrl}/h?dt=snedevc`;
    return this.http.post<string>(url, paras, this.httpOptions).pipe(
      catchError(this.handleHttpErrorService.handleError<string>(`EmailService: sendVerificationCode email=${email}`))
    );
  }
}
