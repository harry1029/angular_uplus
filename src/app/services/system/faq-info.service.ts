import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { FaqInfo } from '../../models/system/faq-info';
import { HandleHttpErrorService } from '../system/handle-http-error.service';

@Injectable()
export class FaqInfoService {

  url: string = environment.apiServerUrl;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private handleHttpErrorService: HandleHttpErrorService,
  ) { }

  /** GET All faqInfos list from the server */
  getAllFaqInfos(): Observable<FaqInfo[]> {
    return this.http.get<FaqInfo[]>(`${this.url}/h?dt=faq&status=all`).pipe(
      catchError(this.handleHttpErrorService.handleError<FaqInfo[]>('FaqInfoService.getAllFaqInfos'))
    );
  }

  /** GET Activated faqInfos list from the server */
  getActivatedFaqInfos(): Observable<FaqInfo[]> {
    return this.http.get<FaqInfo[]>(`${this.url}/h?dt=faq&status=1`).pipe(
      catchError(this.handleHttpErrorService.handleError<FaqInfo[]>('FaqInfoService.getActivatedFaqInfos'))
    );
  }

  /** GET faqInfo by id.  */
  getFaqInfo(id: number): Observable<FaqInfo> {
    return this.http.get<FaqInfo>(`${this.url}/h/${id}?dt=faq`).pipe(
      catchError(this.handleHttpErrorService.handleError<FaqInfo>('FaqInfoService.getFaqInfo'))
    );
  }

  /** PUT: update the faqInfo on the server */
  updateFaqInfo(faqInfo: FaqInfo): Observable<any> {
    return this.http.put<number>(`${this.url}/h?dt=faq`, faqInfo, this.httpOptions).pipe(
      catchError(this.handleHttpErrorService.handleError<number>('FaqInfoService.updateFaqInfoo'))
    );
  }


  /** POST: add a new faqInfo to the server */
  addFaqInfo(faqInfo: FaqInfo): Observable<number> {
    return this.http.post<number>(`${this.url}/h?dt=faq`, faqInfo, this.httpOptions).pipe(
      catchError(this.handleHttpErrorService.handleError<number>('FaqInfoService.addFaqInfo'))
    );
  }

  /** DELETE: delete the faqInfo from the server */
  deleteFaqInfo(id: number): Observable<number> {
    return this.http.delete<number>(`${this.url}/h/${id}?dt=faq`, this.httpOptions).pipe(
      catchError(this.handleHttpErrorService.handleError<number>('FaqInfoService.deleteFaqInfo'))
    );
  }
}
