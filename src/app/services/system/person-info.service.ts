import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { HandleHttpErrorService } from '../system/handle-http-error.service';
import { PersonInfo } from '../../models/system/person-info';
import { PersonAddition } from '../../models/system/person-addition';
import { QueryCondition } from '../../models/system/query-condition';
import { PersonExtension } from '../../models/system/person-extension';

@Injectable()
export class PersonInfoService {

  constructor(
    private http: HttpClient,
    private handleHttpErrorService: HandleHttpErrorService,
  ) { }

  url: string = environment.apiServerUrl;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  //Modify PersonInfo
  updatePersonInfo(personInfo: PersonInfo): Observable<number> {
    return this.http.put<number>(`${this.url}/hs?dt=personnel`, personInfo, this.httpOptions).pipe(
      catchError(this.handleHttpErrorService.handleError<number>('PersonInfoService.updatePersonInfo'))
    );
  }

  //Delete PersonInfo
  deletePersonInfo(id: number): Observable<number> {
    return this.http.delete<number>(`${this.url}/h/${id}?dt=personnel`, this.httpOptions).pipe(
      catchError(this.handleHttpErrorService.handleError<number>('PersonInfoService.deletePersonInfo'))
    );
  }

  //Get PersonInfo by userId
  getPersonInfo(userId: number): Observable<PersonInfo> {
    return this.http.get<PersonInfo>(`${this.url}/hs/${userId}?dt=personnel`).pipe(
      catchError(this.handleHttpErrorService.handleError<PersonInfo>('PersonInfoService.getPersonInfo'))
    );
  }

  //得到PersonInfo基本信息， by personId
  getPersonBaseInfoByPersonId(personId: number): Observable<PersonInfo> {
    return this.http.get<PersonInfo>(`${this.url}/hs/${personId}?dt=personbase`).pipe(
      catchError(this.handleHttpErrorService.handleError<PersonInfo>('PersonInfoService.getPersonInfo'))
    );
  }

  //得到PersonId， by userId
  getPersonIdByUserId(userId: number): Observable<number> {
    return this.http.get<number>(`${this.url}/hs/${userId}?dt=personid`).pipe(
      catchError(this.handleHttpErrorService.handleError<number>('PersonInfoService.getPersonIdByUserId'))
    );
  }

  //得到userId. by PersonId
  getUserIdIdByPersonId(personId: number): Observable<number> {
    return this.http.get<number>(`${this.url}/hs/${personId}?dt=userId`).pipe(
      catchError(this.handleHttpErrorService.handleError<number>('PersonInfoService.getUserIdIdByPersonId'))
    );
  }

  //检查个人信息填写的完整性。返回：>0信息完善; =0缺个人信息; =-1证照信息正常，个人信息需要完善; <-1不存在相关证照信息
  checkPersonInfoByUserId(userId: number): Observable<number> {
    return this.http.get<number>(`${this.url}/hs/${userId}?dt=checkpersoninfo`).pipe(
      catchError(this.handleHttpErrorService.handleError<number>('PersonInfoService.checkPersonInfoByUserId'))
    );
  }

  //PersonExtension
  updateExtension(personExtension: PersonExtension): Observable<number> {
    return this.http.post<number>(`${this.url}/hs?dt=personextension&dd=${personExtension.type}`, personExtension, this.httpOptions).pipe(
      catchError(this.handleHttpErrorService.handleError<number>('PersonInfoService.updateExtensionInfo'))
    );
  }

  getExtension(personId: number, extensionType: number): Observable<PersonExtension> {
    return this.http.get<PersonExtension>(`${this.url}/hs?dt=personextension&et=${extensionType}&pid=${personId}`).pipe(
      catchError(this.handleHttpErrorService.handleError<PersonExtension>('PersonInfoService.getExtensionInfo'))
    );
  }
  //


  //PersonAdditionInfo
  updateAdditionInfo(personAdditionInfo: PersonAddition): Observable<number> {
    return this.http.post<number>(`${this.url}/hs?dt=personaddition&dd=${personAdditionInfo.type}`, personAdditionInfo, this.httpOptions).pipe(
      catchError(this.handleHttpErrorService.handleError<number>('PersonInfoService.updateAdditionInfo'))
    );
  }

  getAdditionInfo(personId: number, additionType: number): Observable<PersonAddition> {
    return this.http.get<PersonAddition>(`${this.url}/hs?dt=personaddition&at=${additionType}&pid=${personId}`).pipe(
      catchError(this.handleHttpErrorService.handleError<PersonAddition>('PersonInfoService.getAdditionInfo'))
    );
  }
  //

  /** GET Teachers list from the server */
  getTeachers(): Observable<PersonInfo[]> {
    return this.http.get<PersonInfo[]>(`${this.url}/h?dt=teacher`).pipe(
      catchError(this.handleHttpErrorService.handleError<PersonInfo[]>('PersonInfoService.getTeachers'))
    );
  }

  /** POST: add a new Teacher to the server */
  addTeacher(person: PersonInfo): Observable<number> {
    if (person.organizationId == null || person.organizationId == 0) {
      person.organizationId = 3
    }
    return this.http.post<number>(`${this.url}/h?dt=personnel`, person, this.httpOptions).pipe(
      catchError(this.handleHttpErrorService.handleError<number>('PersonInfoService.addTeacher'))
    );
  }

  /** GET Students list from the server */
  getStudents(): Observable<PersonInfo[]> {
    return this.http.get<PersonInfo[]>(`${this.url}/h?dt=student`).pipe(
      catchError(this.handleHttpErrorService.handleError<PersonInfo[]>('PersonInfoService.getStudents'))
    );
  }

  /** POST: add a new Student to the server */
  addStudent(person: PersonInfo): Observable<number> {
    if (person.organizationId == null || person.organizationId == 0) {
      person.organizationId = 2
    }
    return this.http.post<number>(`${this.url}/h?dt=personnel`, person, this.httpOptions).pipe(
      catchError(this.handleHttpErrorService.handleError<number>('PersonInfoService.addStudent'))
    );
  }

  /** POST: add a new Teacher to the server */
  addStudents(person: PersonInfo): Observable<number> {
    if (person.organizationId == null || person.organizationId == 0) {
      person.organizationId = 2
    }
    return this.http.post<number>(`${this.url}/h?dt=personnel`, person, this.httpOptions).pipe(
      catchError(this.handleHttpErrorService.handleError<number>('PersonInfoService.addStudents'))
    );
  }

    //综合查询-教师列表
  getTeachersByQuery(q: QueryCondition): Observable<PersonInfo[]> {
    if (q.whereAnd == null) {
      q.whereAnd = [{ keyCode: "o.type", operator: "=", description: "21" }]
    } else {
      q.whereAnd.push({ keyCode: "o.type", operator: "=", description: "21" })
    }
    return this.http.post<PersonInfo[]>(`${this.url}/qs?dt=personnel`, q, this.httpOptions).pipe(
      catchError(this.handleHttpErrorService.handleError<PersonInfo[]>('PersonInfoService.getTeachersByQuery'))
    );
  }

  //综合查询-教师总数
  getTeachersCount(q: QueryCondition): Observable<number> {
    if (q.whereAnd == null) {
      q.whereAnd = [{ keyCode: "o.type", operator: "=", description: "21" }]
    } else {
      q.whereAnd.push({ keyCode: "o.type", operator: "=", description: "21" })
    }

    return this.http.post<number>(`${this.url}/qs?dt=personnelcount`, q, this.httpOptions).pipe(
      catchError(this.handleHttpErrorService.handleError<number>('PersonInfoService.getTeachersCount'))
    );
  }

  //综合查询-学生列表
  getStudentsByQuery(q: QueryCondition): Observable<PersonInfo[]> {
    if (q.whereAnd == null) {
      q.whereAnd = [{ keyCode: "o.type", operator: "=", description: "1" }]
    } else {
      q.whereAnd.push({ keyCode: "o.type", operator: "=", description: "1" })
    }
    return this.http.post<PersonInfo[]>(`${this.url}/qs?dt=personnel`, q, this.httpOptions).pipe(
      catchError(this.handleHttpErrorService.handleError<PersonInfo[]>('PersonInfoService.getStudentsByQuery'))
    );
  }

  //综合查询-学生总数
  getStudentsCount(q: QueryCondition): Observable<number> {
    if (q.whereAnd == null) {
      q.whereAnd = [{ keyCode: "o.type", operator: "=", description: "1" }]
    } else {
      q.whereAnd.push({ keyCode: "o.type", operator: "=", description: "1" })
    }

    return this.http.post<number>(`${this.url}/qs?dt=personnelcount`, q, this.httpOptions).pipe(
      catchError(this.handleHttpErrorService.handleError<number>('PersonInfoService.getStudentsCount'))
    );
  }

  ////得到指定教练信息
  //getTrainer(personId: number): Observable<Trainer> {
  //    return this.http.get<Trainer>(`${this.url}/hs/${personId}?dt=trainer`).pipe(
  //        catchError(this.handleHttpErrorService.handleError<Trainer>('PersonInfoService.getTrainer'))
  //    );
  //}
}
