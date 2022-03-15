import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { HandleHttpErrorService } from '../system/handle-http-error.service';
import { PersonCredential } from '../../models/system/person-credential';

@Injectable()
export class PersonPictureService {

    constructor(
        private http: HttpClient,
        private handleHttpErrorService: HandleHttpErrorService,
    ) { }

    url: string = environment.apiServerUrl;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    //¸ü¿ìÒ»Ð©£¬¶Ô±ÈÏÂÒ»¸ö·½·¨
    getPersonPictureIdByPersonIdAndPictureTypeAndPictureFlag(personId: number, pictureType: number, pictureFlag: number): Observable<number> {
        return this.http.get<number>(`${this.url}/hs/${personId}?dt=personpicid&picturetype=${pictureType}&pictureflag=${pictureFlag}`).pipe(
          catchError(this.handleHttpErrorService.handleError<number>('PersonPictureService.getPersonPictureIdByPersonIdAndPictureTypeAndPictureFlag'))
        );
    }

    //ÂýÒ»Ð©
    getPersonPictureIdByUserIdAndPictureTypeAndPictureFlag(userId: number, pictureType: number, pictureFlag: number): Observable<number> {
        return this.http.get<number>(`${this.url}/hs/${userId}?dt=personpictureid&picturetype=${pictureType}&pictureflag=${pictureFlag}`).pipe(
          catchError(this.handleHttpErrorService.handleError<number>('PersonPictureService.getPersonPictureIdByUserIdAndPictureTypeAndPictureFlag'))
        );
    }

    checkPersonCredentialByPictureId(pictureId: number, personId: number): Observable<PersonCredential> {
        return this.http.get<PersonCredential>(`${this.url}/hs/${pictureId}?dt=personcredential&pid=${personId}`).pipe(
          catchError(this.handleHttpErrorService.handleError<PersonCredential>('PersonPictureService.checkPersonCredentialByPictureId'))
        );
    }

}
