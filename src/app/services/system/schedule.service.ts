import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { HandleHttpErrorService } from '../system/handle-http-error.service';
import { ScheduleSetup } from '../../models/system/schedule-setup';
import { PersonalCalendar } from '../../models/system/personal-calendar';

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

    getPersonalWeekSchedule(personalId: number, date: number): Observable<PersonalCalendar[]> {
        return this.http.get<PersonalCalendar[]>(`${this.url}/hs/${personalId}?dt=weekcalendar&date=${date}`).pipe(
            catchError(this.handleHttpErrorService.handleError<PersonalCalendar[]>('ScheduleService.getTrainerWeekSchedule'))
        );
    }

    //统计个人日历记录数，用于判断是否设置过日程
    CountPersonalCalendarsByPersonalId(personalId: number): Observable<number> {
        return this.http.get<number>(`${this.url}/hs/${personalId}?dt=countcalendar`).pipe(
            catchError(this.handleHttpErrorService.handleError<number>('ScheduleService.CountPersonalCalendarsByPersonalId'))
        );
    }
}
