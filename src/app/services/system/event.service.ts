import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { HandleHttpErrorService } from '../system/handle-http-error.service';
import { PersonEvent } from '../../models/system/person-event';

@Injectable()
export class EventService {

    constructor(
        private http: HttpClient,
        private handleHttpErrorService: HandleHttpErrorService,
    ) { }

    url: string = environment.apiServerUrl;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    //»ñÈ¡µ±Ç°Ò»ÖÜµÄ¸öÈËÊÂ¼þ
    getPersonWeekEvents(personId: number, date: number, userType: number): Observable<PersonEvent[]> {
        return this.http.get<PersonEvent[]>(`${this.url}/hs/${personId}?dt=pweekevent&date=${date}&usertype=${userType}`).pipe(
            catchError(this.handleHttpErrorService.handleError<PersonEvent[]>('ScheduleService.getTrainerWeekSchedule'))
        );
    }
}
