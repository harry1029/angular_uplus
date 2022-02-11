import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, tap, delay } from 'rxjs/operators';

import jwt_deCode from "jwt-decode";

import { environment } from '../../environments/environment';
import { HandleHttpErrorService } from '../services/system/handle-http-error.service';
import { UserLogin } from '../models/system/user-login';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // store the URL so we can redirect after logging in
  redirectUrl?: string;
  private isUserLoggedIn: Subject<boolean> = new Subject<boolean>();
  isUserLoggedIn$ = this.isUserLoggedIn.asObservable();
  private currentUser!: UserLogin;
  private apiUrl: string = environment.apiServerUrl;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  public userClaims: any
  timestamp: number = 0;
  private showTopbarFlag: boolean = false;
  private showBottombarFlag: boolean = true;
  private menuRootId: number = 0;

  constructor(private http: HttpClient,
    private handleHttpErrorService: HandleHttpErrorService,
  ) {
    try {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
      this.userClaims = jwt_deCode(this.currentUser.token!);
    } catch (e) {
      console.log(e);
    }
  }

  public get currentUserValue(): UserLogin {
    return this.currentUser;
  }

  public get isLoggedIn(): boolean {
    if (this.currentUser != null && this.currentUser.userId > 0) {
      return true
    }
    return false
  }

  login(userLogin: UserLogin): Observable<UserLogin> {
    //userLogin.userId: 0-login phone, 1-login Email, 21-Google Login, 22-FaceBook Login, 61-Sign up by Email.
    const url = `${this.apiUrl}/login`;
    return this.http.post<UserLogin>(url, userLogin, this.httpOptions).pipe(
      tap(user => {
        if (user.userId > 0) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUser = user
          this.userClaims = jwt_deCode(this.currentUser.token!);
          this.userLoggedInNext(); //登陆成功后，发送一个可观察值以重新获取用户菜单，top-bar.component.ts
        }
      }),
      catchError(this.handleHttpErrorService.handleError<UserLogin>(`AuthService: login =${userLogin.userName}`))
    );
  }

  userLoggedInNext() {
    this.isUserLoggedIn.next(true);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUser = null!;
    this.userClaims = null;
    location.replace("/");
  }

  getUserProfilePhotoPath() {
    if (this.userClaims == null || this.userClaims.profilePic == null) {
      return "assets/pic/no-photo.png"
    }
    return this.apiUrl + this.userClaims.profilePic
  }

  updateUserClaims() {
    if (this.userClaims != null && this.userClaims.userId > 0) {
      this.getUserClaims(this.userClaims.userId).subscribe(claims => {
        this.userClaims = claims
        localStorage.removeItem('currentUser');
      })
    }
  }

  getUserClaims(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/hs/${userId}?dt=userclaims`).pipe(
      catchError(this.handleHttpErrorService.handleError<UserLogin>(`AuthService: updateUserClaims =${userId}`))
    )
  }

  checkTimestamp(): boolean {
    let t = (new Date()).valueOf();
    if (t - this.timestamp < 5000) {
      this.timestamp = t
      return false
    }
    this.timestamp = t
    return true
  }

  getShowTopbarFlag(): boolean {
    return this.showTopbarFlag;
  }

  setShowTopbarFlag(flag: boolean) {
    this.showTopbarFlag = flag;
  }

  getShowBottombarFlag(): boolean {
    return this.showBottombarFlag;
  }

  setShowBottombarFlag(flag: boolean) {
    this.showBottombarFlag = flag;
  }

  getMenuRootId(): number {
    return this.menuRootId;
  }

  setNormalMenu() {
    this.menuRootId = 0;
  }

  setAdminMenu() {
    this.menuRootId = 1000;
  }

}

