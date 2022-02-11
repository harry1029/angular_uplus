import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { HandleHttpErrorService } from '../system/handle-http-error.service';
import { PersonalAccount } from '../../models/system/personal-account';

@Injectable()
export class PersonalAccountService {

    constructor(
        private http: HttpClient,
        private handleHttpErrorService: HandleHttpErrorService,
    ) { }

    url: string = environment.apiServerUrl;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    //得到getPersonalAccount， by personal_id & accountType
    getPersonalAccount(personal_id: number, accountType: number): Observable<PersonalAccount> {
        return this.http.get<PersonalAccount>(`${this.url}/hs/${personal_id}?dt=personalaccount&type=${accountType}`).pipe(
            catchError(this.handleHttpErrorService.handleError<PersonalAccount>('PersonalAccountService.getPersonalAccount'))
        );
    }

    //更新，只更新状态和收款账号
    updatePersonalAccountOnlyStatusAndNumber(pas: PersonalAccount[]): Observable<number> {
        return this.http.put<number>(`${this.url}/hs?dt=personalaccount`, pas, this.httpOptions).pipe(
            catchError(this.handleHttpErrorService.handleError<number>('PersonalAccountService.updatePersonalAccountOnlyStatusAndNumber'))
        );
    }
}

