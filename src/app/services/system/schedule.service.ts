import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { HandleHttpErrorService } from '../system/handle-http-error.service';
import { ScheduleSetup } from '../../models/system/schedule-setup';
import { PersonCalendar } from '../../models/system/person-calendar';

@Injectable()
export class ScheduleService {

    constructor(
        private http: HttpClient,
        private handleHttpErrorService: HandleHttpErrorService,
    ) { }

    url: string = environment.apiServerUrl;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    updateScheduleSetup(scheduleSetup: ScheduleSetup): Observable<number> {
        return this.http.post<number>(`${this.url}/hs?dt=schedulesetup`, scheduleSetup, this.httpOptions).pipe(
            catchError(this.handleHttpErrorService.handleError<number>('ScheduleService.updateScheduleSetup'))
        );
    }

    getPersonWeekSchedule(personId: number, date: number): Observable<PersonCalendar[]> {
        return this.http.get<PersonCalendar[]>(`${this.url}/hs/${personId}?dt=weekcalendar&date=${date}`).pipe(
            catchError(this.handleHttpErrorService.handleError<PersonCalendar[]>('ScheduleService.getTrainerWeekSchedule'))
        );
    }

    //Í³¼Æ¸öÈËÈÕÀú¼ÇÂ¼Êý£¬ÓÃÓÚÅÐ¶ÏÊÇ·ñÉèÖÃ¹ýÈÕ³Ì
    CountPersonCalendarsByPersonId(personId: number): Observable<number> {
        return this.http.get<number>(`${this.url}/hs/${personId}?dt=countcalendar`).pipe(
            catchError(this.handleHttpErrorService.handleError<number>('ScheduleService.CountPersonCalendarsByPersonId'))
        );
    }
}
