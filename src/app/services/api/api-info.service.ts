import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


import { environment } from '../../../environments/environment';
import { ApiInfo } from '../../models/api/api-info';
import { HandleHttpErrorService } from '../system/handle-http-error.service';

@Injectable()
export class ApiInfoService {

  url: string = environment.apiServerUrl;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private handleHttpErrorService: HandleHttpErrorService,
  ) { }

  /** GET All apiInfos list from the server */
  getAllApiInfos(): Observable<ApiInfo[]> {
    return this.http.get<ApiInfo[]>(`${this.url}/h?dt=api&status=all`).pipe(
      catchError(this.handleHttpErrorService.handleError<ApiInfo[]>('ApiInfoService.getApiInfos'))
    );
  }

  /** GET Activated apiInfos list from the server */
  getActivatedApiInfos(): Observable<ApiInfo[]> {
    return this.http.get<ApiInfo[]>(`${this.url}/h?dt=api&status=1`).pipe(
      catchError(this.handleHttpErrorService.handleError<ApiInfo[]>('ApiInfoService.getApiInfos'))
    );
  }

  /** GET apiInfo by id.  */
  getApiInfo(id: number): Observable<ApiInfo> {
    return this.http.get<ApiInfo>(`${this.url}/h/${id}?dt=api`).pipe(
      catchError(this.handleHttpErrorService.handleError<ApiInfo>('ApiInfoService.getApiInfo'))
    );
  }

  /** PUT: update the apiInfo on the server */
  updateApiInfo(apiInfo: ApiInfo): Observable<any> {
    return this.http.put<number>(`${this.url}/h?dt=api`, apiInfo, this.httpOptions).pipe(
      catchError(this.handleHttpErrorService.handleError<number>('ApiInfoService.updateApiInfo'))
    );
  }


  /** POST: add a new apiInfo to the server */
  addApiInfo(apiInfo: ApiInfo): Observable<number> {
    return this.http.post<number>(`${this.url}/h?dt=api`, apiInfo, this.httpOptions).pipe(
      catchError(this.handleHttpErrorService.handleError<number>('ApiInfoService.addApiInfo'))
    );
  }

  /** DELETE: delete the apiInfo from the server */
  deleteApiInfo(id: number): Observable<number> {
    return this.http.delete<number>(`${this.url}/h/${id}?dt=api`, this.httpOptions).pipe(
      catchError(this.handleHttpErrorService.handleError<number>('ApiInfoService.deleteApiInfo'))
    );
  }
}
