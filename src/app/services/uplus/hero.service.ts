import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { HandleHttpErrorService } from '../system/handle-http-error.service';
import { Hero } from '../../models/uplus/hero';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private http: HttpClient,
    private handleHttpErrorService: HandleHttpErrorService,
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  apiUrl: string = environment.apiServerUrl;


  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.apiUrl}/h?dt=hero`).pipe(
      catchError(this.handleHttpErrorService.handleError<Hero[]>('HeroService.getHeroes', []))
    );
  }

  /** GET hero by id.  */
  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.apiUrl}/h/${id}?dt=hero`).pipe(
      catchError(this.handleHttpErrorService.handleError<Hero>('HeroService.getHero'))
    );
  }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put<number>(`${this.apiUrl}/h?dt=hero`, hero, this.httpOptions).pipe(
      catchError(this.handleHttpErrorService.handleError<number>('HeroService.updateHero'))
    );
  }


  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/h?dt=hero`, hero, this.httpOptions).pipe(
      catchError(this.handleHttpErrorService.handleError<number>('HeroService.addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(id: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}/h/${id}?dt=hero`, this.httpOptions).pipe(
      catchError(this.handleHttpErrorService.handleError<number>('HeroService.deleteHero'))
    );
  }


  /** POST: add a new hero to the server */
  //////////////////////////////test////////////////////////////////////////////
  //addMenuItem(): Observable<Trainer> {
  //    let m: OrgTree = {
  //        "id": 102, "parentId": 1, "status": 1, "order": 22, "name": "测试名称2", "enName": "英文名2", "orgCode":"代码", "divisionFlag": 1, "address": "地址aaa", "principal": "负责人版本", "secretary": "联系人",
  //        "phone1": "电话2", "fax": "传真2", "emailAddress": "电子邮箱2","webAddress": "Web网址", "description": "描述4"     }
  //    let q: QueryCondition = {
  //        whereOr: [{ keyCode: "sex", operator: "=", description: "1" }, { keyCode: "sex", operator: "=", description: "0" }, { keyCode: "t1.addition_bigint", operator: ">", description:"0" }],
  //        orderBy: [{ keyCode: "t1.addition_bigint", operator: "desc" }, { keyCode: "id", operator: "Desc" }], 
  //        pageNumber: 1,
  //        pageSize: 25
  //    }

  //    return this.http.post<Trainer>(`${this.heroesUrl}/q?dt=trainers`, q, this.httpOptions).pipe(
  //        catchError(this.handleError<Trainer>('addMenuItem'))
  //    );
  //}

}
