import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { HandleHttpErrorService } from '../system/handle-http-error.service';
import { CodeValue } from '../../models/system/code-value';

@Injectable()
export class CodeConversionService {

    constructor(
        private http: HttpClient,
        private handleHttpErrorService: HandleHttpErrorService,
    ) { }

    url: string = environment.apiServerUrl;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    getDisplayValue(id: number, dataType: string ): Observable<string> {
        return this.http.get<string>(`${this.url}/co/${id}?dt=${dataType}`).pipe(
            catchError(this.handleHttpErrorService.handleError<string>('CodeConversionService.getDisplayValue'))
        );
    }

    //µÃµ½¶àÖµµÄ×Ö·û´®
    getDisplayValueList(ids: number[], dataType: string): Observable<string> {
        return this.http.post<string>(`${this.url}/co?dt=${dataType}`, ids, this.httpOptions).pipe(
            catchError(this.handleHttpErrorService.handleError<string>('CodeConversionService.getDisplayValue', dataType))
        );
    }

    getCodeValues(codeType: number): Observable<CodeValue[]> {
        return this.http.get<CodeValue[]>(`${this.url}/co?dt=codevalue&ct=${codeType}`).pipe(
            catchError(this.handleHttpErrorService.handleError<CodeValue[]>('CodeConversionService.getCodeValues', null))
        );
    }

    getCodeValue(codeType: number, codeId: number): Observable<string> {
        return this.http.get<string>(`${this.url}/co/${codeId}?dt=codevalue&ct=${codeType}`).pipe(
            catchError(this.handleHttpErrorService.handleError<string>('CodeConversionService.getDisplayValue'))
        );
    }

}
