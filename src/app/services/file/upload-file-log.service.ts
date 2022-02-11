import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { UploadFileLogStru } from '../../models/file/upload-file-log';
import { HandleHttpErrorService } from '../system/handle-http-error.service';
import { ReturnMessage } from '../../models/api/return-message';

@Injectable()
export class UploadFileLogService {

    constructor(
        private http: HttpClient,
        private handleHttpErrorService: HandleHttpErrorService,
    ) { }

    url: string = environment.apiServerUrl;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    //所有有效文件
    getAvailableUploadFileLogStrus(): Observable<UploadFileLogStru[]> {
        var queryUrl: string = this.url + "/hs?dt=ufl";
        return this.http.get<UploadFileLogStru[]>(queryUrl)
            .pipe(
                tap(_ => this.handleHttpErrorService.log('UploadFileLogService: getUploadFileLogStru')),
                catchError(this.handleHttpErrorService.handleError<UploadFileLogStru[]>('UploadFileLogService.getUploadFileLogStru Err. '))
            );
    }

    //所有文件
    getUploadFileLogStrus(): Observable<UploadFileLogStru[]> {
        var queryUrl: string = this.url + "/hs?dt=ufla";
        return this.http.get<UploadFileLogStru[]>(queryUrl)
            .pipe(
                tap(_ => this.handleHttpErrorService.log('UploadFileLogService: getUploadFileLogStru')),
                catchError(this.handleHttpErrorService.handleError<UploadFileLogStru[]>('UploadFileLogService.getUploadFileLogStru Err. '))
            );
    }

    //删除指定ID的文件
    deleteUploadFileLogStru(uploadFileLogStru: UploadFileLogStru | number): Observable<Number> {
        const id = typeof uploadFileLogStru === 'number' ? uploadFileLogStru : uploadFileLogStru.id;
        const url = `${this.url}/hs/${id}?dt=ufl`;
        return this.http.delete<Number>(url, this.httpOptions).pipe(
            tap(_ => this.handleHttpErrorService.log(`UploadFileLogService: deleted uploadFileLogStru id=${id}`)),
            catchError(this.handleHttpErrorService.handleError<Number>(`UploadFileLogService: deleted uploadFileLogStru id=${id}`))
        );
    }

    //数据文件，头像裁剪图片
    uploadFileData(body: FormData): Observable<ReturnMessage> {
        return this.http.post<ReturnMessage>(this.url + `/filedataupload?dt=profilephoto&uid=${body.get("userid")}&picturetype=${body.get("picturetype")}`, body).pipe(
            catchError(this.handleHttpErrorService.handleError<ReturnMessage>(`UploadFileLogService: uploadFileData userid=${body.get("userid")}`))
        );
    }

    //数据文件，个人证照图片
    uploadPersonalFileData(body: FormData): Observable<ReturnMessage> {
        return this.http.post<ReturnMessage>(this.url + `/filedataupload?dt=personalphoto&pid=${body.get("personalId")}&picturetype=${body.get("picturetype")}&pictureflag=${body.get("pictureflag")}`, body).pipe(
            catchError(this.handleHttpErrorService.handleError<ReturnMessage>(`UploadFileLogService: uploadPersonalFileData userid=${body.get("userid")}`))
        );
    }
}
