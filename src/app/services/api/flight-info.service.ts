import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HandleHttpErrorService } from '../system/handle-http-error.service';

import { environment } from '../../../environments/environment';

import { ApiFlightInfo } from '../../models/api/api-flight-info';

@Injectable({
  providedIn: 'root'
})
export class FlightInfoService {

  constructor(
    private http: HttpClient,
    private handleHttpErrorService: HandleHttpErrorService,
  ) { }

  url: string = environment.flightAwareApiUrl;

  getApiFlightInfo(flightNo: string, flightDate: string): Observable<ApiFlightInfo> {
    var queryUrl: string = this.url + "?flightNo=" + flightNo + "&flightDate=" + flightDate;
    return this.http.get<ApiFlightInfo>(queryUrl)
      .pipe(
        tap(_ => this.handleHttpErrorService.log('FlightInfoService: fetched ApiFlightInfo')),
        catchError(this.handleHttpErrorService.handleError<ApiFlightInfo>('FlightInfoService.getApiFlightInfo Err. '))
      );
  }

}
