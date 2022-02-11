import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HandleHttpErrorService } from '../system/handle-http-error.service';
import { environment } from '../../../environments/environment';
import { LanguageInfo } from '../../models/system/language-info';


@Injectable()
export class LanguageService {

    constructor(
        private http: HttpClient,
        private handleHttpErrorService: HandleHttpErrorService,
    ) { }

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    apiUrl: string = environment.apiServerUrl;

    getLanguageInfos(): Observable<LanguageInfo[]> {
        return this.http.get<LanguageInfo[]>(`${this.apiUrl}/h?dt=language`).pipe(
            catchError(this.handleHttpErrorService.handleError<LanguageInfo[]>('LanguageService.getLanguageInfos', []))
        );
    }
}
