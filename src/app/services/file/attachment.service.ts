import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
​
import { environment } from '../../../environments/environment';
import { HandleHttpErrorService } from '../system/handle-http-error.service';
import { PersonAttachment } from '../../models/system/person-attachment';
​
@Injectable()
export class AttachmentService {
​
  constructor(
    private http: HttpClient,
    private handleHttpErrorService: HandleHttpErrorService,
  ) { }
​
  url: string = environment.apiServerUrl;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
​
  /** GET person attachment list from the server */
  getPersonAttachmentByPersonId(personId: number): Observable<PersonAttachment[]> {
    return this.http.get<PersonAttachment[]>(`${this.url}/h/${personId}?dt=personattachment`).pipe(
      catchError(this.handleHttpErrorService.handleError<PersonAttachment[]>('AttachmentService.getPersonAttachmentByPersonId'))
    );
  }
​
  /** PUT: update the person attachment */
  updatePersonAttachment(pa: PersonAttachment): Observable<any> {
    return this.http.put<number>(`${this.url}/h?dt=personattachment`, pa, this.httpOptions).pipe(
      catchError(this.handleHttpErrorService.handleError<number>('ApiInfoService.updateApiInfo'))
    );
  }
​
  /** DELETE: delete the person attachment */
  deletePersonAttachment(id: number): Observable<number> {
    return this.http.delete<number>(`${this.url}/h/${id}?dt=personattachment`, this.httpOptions).pipe(
      catchError(this.handleHttpErrorService.handleError<number>('ApiInfoService.deleteApiInfo'))
    );
  }
​
  //sizeType: 1-big image, 2-middle, 3-original, 0-small
  getAttachmentSourceById(attachmentId: number, sizeType: number): Observable<string> {
    return this.http.get<string>(`${this.url}/h/${attachmentId}?dt=attachment&type=${sizeType}`).pipe(
      catchError(this.handleHttpErrorService.handleError<string>('AttachmentService.getAttachmentById'))
    );
  }
}