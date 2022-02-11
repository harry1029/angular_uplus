import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Location } from '@angular/common';

import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";


import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

import { PersonalInfoService } from '../../services/system/personal-info.service';
import { AuthService } from '../auth.service';
import { UserLogin } from '../../models/system/user-login';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css'],
  providers: [MessageService, PersonalInfoService]
})
export class LoginUserComponent implements OnInit {

  userEmail: string;
  userName: string;
  userPassword: string;

  constructor(
    public authService: AuthService,
    private personalInfoService: PersonalInfoService,
    private router: Router,
    private messageService: MessageService,
    private location: Location,
    private primengConfig: PrimeNGConfig,
    private SocialAuthService: SocialAuthService
  ) {
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
  }

  login() {
    if (this.userEmail == null || this.userEmail.trim().length < 6) {
      this.messageService.add({ severity: 'info', detail: 'Please enter the correct Email address.' });
      return;
    }
    if (this.userPassword == null || this.userPassword.length < 6) {
      this.messageService.add({ severity: 'info', detail: 'Password must have at least 6 characters.' });
      return;
    }
    let userLogin: UserLogin = { userId: 1, areaId: 0, userType: 0, userName: this.userEmail, password: this.userPassword }
    this.authLogin(userLogin)
  }

  authLogin(userLogin: UserLogin) {
    let userType: number;
    userType = 1
    userLogin.userType = userType
    this.authService.login(userLogin).subscribe(userLogin => {
      if (userLogin.userId > 0) {
        //检查是否已填写个人信息
        this.personalInfoService.checkPersonalInfoByUserId(userLogin.userId).subscribe(iRet => {
          // Get the redirect URL from our auth service
          // If no redirect has been set, use the default
          let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home';
          if (iRet <= 0) {        //个人信息未填写
            redirect = `/personal/edit/${userLogin.userId}`;
          }

          // Set our navigation extras object
          // that passes on our global query params and fragment
          let navigationExtras: NavigationExtras = {
            queryParamsHandling: 'preserve',
            preserveFragment: true
          };

          // Redirect the user
          this.router.navigate([redirect], navigationExtras);
        })

      } else if (userLogin.userId == -1) {
        this.messageService.add({ severity: 'info', detail: 'User login failed: the verification code is wrong!' });
      } else if (userLogin.userId == -12) {
        this.messageService.add({ severity: 'info', detail: 'User login failed: the Email address has been taken！' });
      } else if (userLogin.userId == -2) {
        this.messageService.add({ severity: 'info', detail: '用户登录失败: 登录身份不符！' });
      } else {
        this.messageService.add({ severity: 'info', detail: 'User login failed！ ERR:' + userLogin.userId.toString() });
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  loginPhone() {
    this.router.navigate([`/login-phone`]);
  }

  signup() {
    this.router.navigate([`/signin`]);
  }

  signInWithGoogle(): void {
    this.SocialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
      console.log("Return:", user)
      let socialUser: SocialUser;
      socialUser = user;
      if (socialUser == null) {
        this.messageService.add({ severity: 'info', detail: 'User login failed: An error occurred inside the server!' });
        return
      }
      let userLogin: UserLogin = { userId: 21, areaId: 0, userType: 0, userName: socialUser.name, token: socialUser.idToken }
      this.authLogin(userLogin)
    });
  }

  signInWithFB(): void {
    this.SocialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(user => {
      console.log("ReturnB:", user)
      let socialUser: SocialUser;
      socialUser = user;
      if (socialUser == null) {
        this.messageService.add({ severity: 'info', detail: 'User login failed: An error occurred inside the server!' });
        return
      }
      let userLogin: UserLogin = { userId: 22, areaId: 0, userType: 0, userName: socialUser.name, token: socialUser.authToken }
      this.authLogin(userLogin)
    });
  }

}
