import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


import { environment } from '../../../environments/environment';
import { OrgTree } from '../../models/system/org-tree';
import { TreeNode } from '../../models/system/tree-node';
import { HandleHttpErrorService } from './handle-http-error.service';

@Injectable()
export class OrganizationService {

  url: string = environment.apiServerUrl;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private handleHttpErrorService: HandleHttpErrorService,
  ) { }

  //得到的是指定结点下的孩子List
  getOrgListByParentId(id: number): Observable<OrgTree[]> {
    return this.http.get<OrgTree[]>(`${this.url}/hs/${id}?dt=orglist`).pipe(
      catchError(this.handleHttpErrorService.handleError<OrgTree[]>('OrganizationService.getOrgListByParentId'))
    );
  }

  //获取指定结点的完整名称
  getOrgFullName(id: number): Observable<string> {
    return this.http.get<string>(`${this.url}/hs/${id}?dt=orgfullname`, this.httpOptions).pipe(
      catchError(this.handleHttpErrorService.handleError<string>('OrganizationService.getOrgFullName'))
    );
  }

  //得到的是树
  getOrgTree(rootId: number): Observable<OrgTree> {
    return this.http.get<OrgTree>(`${this.url}/hs?dt=org&pid=${rootId}`).pipe(
      catchError(this.handleHttpErrorService.handleError<OrgTree>('OrganizationService.getOrgTree'))
    );
  }

  //add
  addOrg(orgTree: OrgTree): Observable<number> {
    return this.http.post<number>(`${this.url}/hs?dt=org`, orgTree, this.httpOptions).pipe(
      catchError(this.handleHttpErrorService.handleError<number>('OrganizationService.addOrg'))
    );
  }

  //delete
  deleteOrg(id: number): Observable<number> {
    return this.http.delete<number>(`${this.url}/hs/${id}?dt=org`, this.httpOptions).pipe(
      catchError(this.handleHttpErrorService.handleError<number>('OrganizationService.deleteOrg'))
    );
  }

  //update
  updateOrg(orgTree: OrgTree): Observable<number> {
    return this.http.put<number>(`${this.url}/hs?dt=org`, orgTree, this.httpOptions).pipe(
      catchError(this.handleHttpErrorService.handleError<number>('OrganizationService.updateOrg'))
    );
  }

  //获取指定结点信息
  getOrg(id: number): Observable<OrgTree> {
    return this.http.get<OrgTree>(`${this.url}/hs/${id}?dt=org`, this.httpOptions).pipe(
      catchError(this.handleHttpErrorService.handleError<OrgTree>('OrganizationService.getOrg'))
    );
  }
}
