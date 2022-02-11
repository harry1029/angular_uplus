import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { HandleHttpErrorService } from '../system/handle-http-error.service';
import { PersonalEvent } from '../../models/system/personal-event';

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

    //获取当前一周的个人事件
    getPersonalWeekEvents(personalId: number, date: number, userType: number): Observable<PersonalEvent[]> {
        return this.http.get<PersonalEvent[]>(`${this.url}/hs/${personalId}?dt=pweekevent&date=${date}&usertype=${userType}`).pipe(
            catchError(this.handleHttpErrorService.handleError<PersonalEvent[]>('ScheduleService.getTrainerWeekSchedule'))
        );
    }
}
