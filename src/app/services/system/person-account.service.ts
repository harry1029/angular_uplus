import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { HandleHttpErrorService } from '../system/handle-http-error.service';
import { PersonAccount } from '../../models/system/person-account';

@Injectable()
export class PersonAccountService {

    constructor(
        private http: HttpClient,
        private handleHttpErrorService: HandleHttpErrorService,
    ) { }

    url: string = environment.apiServerUrl;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    //µÃµ½getPersonAccount£¬ by person_id & accountType
    getPersonAccount(person_id: number, accountType: number): Observable<PersonAccount> {
        return this.http.get<PersonAccount>(`${this.url}/hs/${person_id}?dt=personaccount&type=${accountType}`).pipe(
            catchError(this.handleHttpErrorService.handleError<PersonAccount>('PersonAccountService.getPersonAccount'))
        );
    }

    //¸üÐÂ£¬Ö»¸üÐÂ×´Ì¬ºÍÊÕ¿îÕËºÅ
    updatePersonAccountOnlyStatusAndNumber(pas: PersonAccount[]): Observable<number> {
        return this.http.put<number>(`${this.url}/hs?dt=personaccount`, pas, this.httpOptions).pipe(
            catchError(this.handleHttpErrorService.handleError<number>('PersonAccountService.updatePersonAccountOnlyStatusAndNumber'))
        );
    }
}

