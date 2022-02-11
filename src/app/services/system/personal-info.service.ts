import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { HandleHttpErrorService } from '../system/handle-http-error.service';
import { PersonalInfo } from '../../models/system/personal-info';
import { PersonalAdditionInfo } from '../../models/system/personal-addition-info';
import { QueryCondition } from '../../models/system/query-condition';
import { PersonalExtend } from '../../models/system/personal-extend';

@Injectable()
export class PersonalInfoService {

    constructor(
        private http: HttpClient,
        private handleHttpErrorService: HandleHttpErrorService,
    ) { }

    url: string = environment.apiServerUrl;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    //Modify PersonalInfo
    updateStaffInfo(personalInfo: PersonalInfo): Observable<number> {
        return this.http.post<number>(`${this.url}/hs?dt=staff`, personalInfo, this.httpOptions).pipe(
            catchError(this.handleHttpErrorService.handleError<number>('PersonalInfoService.updateStaffInfo'))
        );
    }

    //Get PersonalInfo£¬ by userId
    getPersonalInfo(userId: number): Observable<PersonalInfo> {
        return this.http.get<PersonalInfo>(`${this.url}/hs/${userId}?dt=staff`).pipe(
            catchError(this.handleHttpErrorService.handleError<PersonalInfo>('PersonalInfoService.getPersonalInfo'))
        );
    }

    //得到PersonalInfo， by personalId
    getPersonalInfoByPersonalId(personalId: number): Observable<PersonalInfo> {
        return this.http.get<PersonalInfo>(`${this.url}/hs/${personalId}?dt=staffpersonal`).pipe(
            catchError(this.handleHttpErrorService.handleError<PersonalInfo>('PersonalInfoService.getPersonalInfo'))
        );
    }

    //得到PersonalInfo基本信息， by personalId
    getPersonalBaseInfoByPersonalId(personalId: number): Observable<PersonalInfo> {
        return this.http.get<PersonalInfo>(`${this.url}/hs/${personalId}?dt=personalbase`).pipe(
            catchError(this.handleHttpErrorService.handleError<PersonalInfo>('PersonalInfoService.getPersonalInfo'))
        );
    }

    //得到PersonalId， by userId
    getPersonalIdByUserId(userId: number): Observable<number> {
        return this.http.get<number>(`${this.url}/hs/${userId}?dt=personalid`).pipe(
            catchError(this.handleHttpErrorService.handleError<number>('PersonalInfoService.getPersonalIdByUserId'))
        );
    }

    //得到userId. by PersonalId
    getUserIdIdByPersonalId(personalId: number): Observable<number> {
        return this.http.get<number>(`${this.url}/hs/${personalId}?dt=userId`).pipe(
            catchError(this.handleHttpErrorService.handleError<number>('PersonalInfoService.getUserIdIdByPersonalId'))
        );
    }

    //检查个人信息填写的完整性。返回：>0信息完善; =0缺个人信息; =-1证照信息正常，个人信息需要完善; <-1不存在相关证照信息
    checkPersonalInfoByUserId(userId: number): Observable<number> {
        return this.http.get<number>(`${this.url}/hs/${userId}?dt=checkpersonalinfo`).pipe(
            catchError(this.handleHttpErrorService.handleError<number>('PersonalInfoService.checkPersonalInfoByUserId'))
        );
    }

    //PersonalExtend
    updateExtend(personalExtend: PersonalExtend): Observable<number> {
        return this.http.post<number>(`${this.url}/hs?dt=personalextend&dd=${personalExtend.extendType}`, personalExtend, this.httpOptions).pipe(
            catchError(this.handleHttpErrorService.handleError<number>('PersonalInfoService.updateExtendInfo'))
        );
    }

    getExtend(personalId: number, extendType: number): Observable<PersonalExtend> {
        return this.http.get<PersonalExtend>(`${this.url}/hs?dt=personalextend&et=${extendType}&pid=${personalId}`).pipe(
            catchError(this.handleHttpErrorService.handleError<PersonalExtend>('PersonalInfoService.getExtendInfo'))
        );
    }
    //


    //PersonalAdditionInfo
    updateAdditionInfo(personalAdditionInfo: PersonalAdditionInfo): Observable<number> {
        return this.http.post<number>(`${this.url}/hs?dt=personaladdition&dd=${personalAdditionInfo.additionType}`, personalAdditionInfo, this.httpOptions).pipe(
            catchError(this.handleHttpErrorService.handleError<number>('PersonalInfoService.updateAdditionInfo'))
        );
    }

    getAdditionInfo(personalId: number, additionType: number): Observable<PersonalAdditionInfo> {
        return this.http.get<PersonalAdditionInfo>(`${this.url}/hs?dt=personaladdition&at=${additionType}&pid=${personalId}`).pipe(
            catchError(this.handleHttpErrorService.handleError<PersonalAdditionInfo>('PersonalInfoService.getAdditionInfo'))
        );
    }
    //

    //得到Teachers' Id List，By personalId
    getPersonalTrainerIdListByPersonalId(personalId: number): Observable<number[]> {
        return this.http.get<number[]>(`${this.url}/hs/${personalId}?dt=traineridlist`).pipe(
            catchError(this.handleHttpErrorService.handleError<number[]>('PersonalInfoService.getAdditionInfo'))
        );
    }

    //得到Teachers' Id List£¬By userId
    getPersonalTrainerIdListByUserId(userId: number): Observable<number[]> {
        return this.http.get<number[]>(`${this.url}/hs/${userId}?dt=traineridlistbyuserid`).pipe(
            catchError(this.handleHttpErrorService.handleError<number[]>('PersonalInfoService.getAdditionInfo'))
        );
    }

    ////教练列表
    //getTrainers(q: QueryCondition): Observable<Trainer[]> {
    //    return this.http.post<Trainer[]>(`${this.url}/qs?dt=trainer`, q, this.httpOptions).pipe(
    //        catchError(this.handleHttpErrorService.handleError<Trainer[]>('PersonalInfoService.getTrainers'))
    //    );
    //}

    ////得到总数
    //getTrainersCount(q: QueryCondition): Observable<number> {
    //    return this.http.post<number>(`${this.url}/qs?dt=trainercount`, q, this.httpOptions).pipe(
    //        catchError(this.handleHttpErrorService.handleError<number>('PersonalInfoService.getTrainersCount'))
    //    );
    //}

    ////得到指定教练信息
    //getTrainer(personalId: number): Observable<Trainer> {
    //    return this.http.get<Trainer>(`${this.url}/hs/${personalId}?dt=trainer`).pipe(
    //        catchError(this.handleHttpErrorService.handleError<Trainer>('PersonalInfoService.getTrainer'))
    //    );
    //}
}
