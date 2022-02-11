import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


import { environment } from '../../../environments/environment';
import { MenuItem } from '../../models/system/menu-item';
import { TreeNode } from '../../models/system/tree-node';
import { HandleHttpErrorService } from './handle-http-error.service';

@Injectable()
export class UserMenuService {

    url: string = environment.apiServerUrl;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient,
        private handleHttpErrorService: HandleHttpErrorService,
    ) { }

    getUserMainMenu(rootId: number): Observable<MenuItem> {
        return this.http.get<MenuItem>(`${this.url}/h?dt=menu&pid=${rootId}`).pipe(
            catchError(this.handleHttpErrorService.handleError<MenuItem>('UserMenuService.getUserMainMenu'))
        );
    }

    //add·þÎñ
    addMenuItem(menuItem: MenuItem): Observable<number> {
        return this.http.post<number>(`${this.url}/hs?dt=menu`, menuItem, this.httpOptions).pipe(
            catchError(this.handleHttpErrorService.handleError<number>('UserMenuService.addMenuItem'))
        );
    }

    //delete·þÎñ
    deleteMenuItem(id: number): Observable<number> {
        return this.http.delete<number>(`${this.url}/hs/${id}?dt=menu`, this.httpOptions).pipe(
            catchError(this.handleHttpErrorService.handleError<number>('UserMenuService.deleteMenuItem'))
        );
    }

    //update·þÎñ
    updateMenuItem(menuItem: MenuItem): Observable<number> {
        return this.http.put<number>(`${this.url}/hs?dt=menu`, menuItem, this.httpOptions).pipe(
            catchError(this.handleHttpErrorService.handleError<number>('UserMenuService.updateMenuItem'))
        );
    }

    //»ñÈ¡¶ÔÓ¦×Ó½Úµã·þÎñ
    getMenuItem(id: number): Observable<MenuItem> {
        return this.http.get<MenuItem>(`${this.url}/hs/${id}?dt=menu`, this.httpOptions).pipe(
            catchError(this.handleHttpErrorService.handleError<MenuItem>('UserMenuService.getMenuItem'))
        );
    }

    //»ñÈ¡¶ÔÓ¦×ÓÊ÷·þÎñ
    getTreeMenu(rootId: number): Observable<TreeNode> {
        return this.http.get<TreeNode>(`${this.url}/h?dt=menu&pid=${rootId}`, this.httpOptions).pipe(
            catchError(this.handleHttpErrorService.handleError<TreeNode>('UserMenuService.getTreeMenu'))
        );
    }
}
