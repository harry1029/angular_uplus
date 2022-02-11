import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { HandleHttpErrorService } from '../system/handle-http-error.service';
import { PersonalCredential } from '../../models/system/personal-credential';

@Injectable()
export class PersonalPictureService {

    constructor(
        private http: HttpClient,
        private handleHttpErrorService: HandleHttpErrorService,
    ) { }

    url: string = environment.apiServerUrl;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    //¸ü¿ìÒ»Ð©£¬¶Ô±ÈÏÂÒ»¸ö·½·¨
    getPersonalPictureIdByPersonalIdAndPictureTypeAndPictureFlag(personalId: number, pictureType: number, pictureFlag: number): Observable<number> {
        return this.http.get<number>(`${this.url}/hs/${personalId}?dt=personalpicid&picturetype=${pictureType}&pictureflag=${pictureFlag}`).pipe(
          catchError(this.handleHttpErrorService.handleError<number>('PersonalPictureService.getPersonalPictureIdByPersonalIdAndPictureTypeAndPictureFlag'))
        );
    }

    //ÂýÒ»Ð©
    getPersonalPictureIdByUserIdAndPictureTypeAndPictureFlag(userId: number, pictureType: number, pictureFlag: number): Observable<number> {
        return this.http.get<number>(`${this.url}/hs/${userId}?dt=personalpictureid&picturetype=${pictureType}&pictureflag=${pictureFlag}`).pipe(
          catchError(this.handleHttpErrorService.handleError<number>('PersonalPictureService.getPersonalPictureIdByUserIdAndPictureTypeAndPictureFlag'))
        );
    }

    checkPersonalCredentialByPictureId(pictureId: number, personalId: number): Observable<PersonalCredential> {
        return this.http.get<PersonalCredential>(`${this.url}/hs/${pictureId}?dt=personalcredential&pid=${personalId}`).pipe(
          catchError(this.handleHttpErrorService.handleError<PersonalCredential>('PersonalPictureService.checkPersonalCredentialByPictureId'))
        );
    }

}
