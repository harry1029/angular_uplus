import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { HandleHttpErrorService } from '../system/handle-http-error.service';

@Injectable()
export class UserPictureService {

    constructor(
        private http: HttpClient,
        private handleHttpErrorService: HandleHttpErrorService,
    ) { }

    url: string = environment.apiServerUrl;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    getUserPictureId(userId: number, pictureType: number): Observable<number> {
        return this.http.get<number>(`${this.url}/hs/${userId}?dt=userpictureid&picturetype=${pictureType}`).pipe(
            catchError(this.handleHttpErrorService.handleError<number>('PersonInfoService.getPersonInfo'))
        );
    }

}
