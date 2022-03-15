import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { HandleHttpErrorService } from './handle-http-error.service';
import { ParameterApiStru } from '../../models/api/parameter-api-stru';
import { CodeValue } from '../../models/system/code-value';

@Injectable()
export class CellPhoneService {

    constructor(
        private http: HttpClient,
        private handleHttpErrorService: HandleHttpErrorService,
    ) { }

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    apiUrl: string = environment.apiServerUrl;

    sendVerificationCode(areaId: number, phoneNumber: string): Observable<string> {
      let paras: ParameterApiStru = { id: 0, intPara1: areaId, strPara1: phoneNumber }
        const url = `${this.apiUrl}/h?dt=snedvc`;
        return this.http.post<string>(url, paras, this.httpOptions).pipe(
            catchError(this.handleHttpErrorService.handleError<string>(`CellPhoneService: sendVerificationCode phoneNumber=${phoneNumber}`))
        );
    }

    getAvailablePhoneAreaCodes(): Observable<CodeValue[]> {
        const url = `${this.apiUrl}/h?dt=phoneareacode`;
        return this.http.get<CodeValue[]>(url).pipe(
            catchError(this.handleHttpErrorService.handleError<CodeValue[]>('CellPhoneService.getAvailablePhoneAreaCodes', []))
        );
    }
}
