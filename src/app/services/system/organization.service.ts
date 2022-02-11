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

    getOrgTree(rootId: number): Observable<OrgTree> {
        return this.http.get<OrgTree>(`${this.url}/hs?dt=org&pid=${rootId}`).pipe(
            catchError(this.handleHttpErrorService.handleError<OrgTree>('OrganizationService.getOrgTree'))
        );
    }

    //add服务
    addOrg(orgTree: OrgTree): Observable<number> {
        return this.http.post<number>(`${this.url}/hs?dt=org`, orgTree, this.httpOptions).pipe(
            catchError(this.handleHttpErrorService.handleError<number>('OrganizationService.addOrg'))
        );
    }

    //delete服务
    deleteOrg(id: number): Observable<number> {
        return this.http.delete<number>(`${this.url}/hs/${id}?dt=org`, this.httpOptions).pipe(
            catchError(this.handleHttpErrorService.handleError<number>('OrganizationService.deleteOrg'))
        );
    }

    //update服务
    updateOrg(orgTree: OrgTree): Observable<number> {
        return this.http.put<number>(`${this.url}/hs?dt=org`, orgTree, this.httpOptions).pipe(
            catchError(this.handleHttpErrorService.handleError<number>('OrganizationService.updateOrg'))
        );
    }

    //获取对应子节点服务
    getOrg(id: number): Observable<OrgTree> {
        return this.http.get<OrgTree>(`${this.url}/hs/${id}?dt=org`, this.httpOptions).pipe(
            catchError(this.handleHttpErrorService.handleError<OrgTree>('OrganizationService.getOrg'))
        );
    }
}
