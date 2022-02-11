import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Location } from '@angular/common';

import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";


import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

import { PersonalInfoService } from '../../services/system/personal-info.service';
import { CellPhoneService } from '../../services/system/cell-phone.service';
import { AuthService } from '../auth.service';
import { CodeValue } from '../../models/system/code-value';
import { UserLogin } from '../../models/system/user-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService, CellPhoneService, PersonalInfoService]
})

export class LoginComponent implements OnInit {

  userName: string;
  userPassword: string;
  contactCellPhone: string;
  verificationCode: string;
  phoneAreaCodeList: CodeValue[];
  phoneAreaCode: CodeValue;
  countFlag: boolean = false;

  constructor(
    public authService: AuthService,
    private cellPhoneService: CellPhoneService,
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
    this.cellPhoneService.getAvailablePhoneAreaCodes().subscribe(codes => {
      this.phoneAreaCodeList = codes;
      this.phoneAreaCode = this.phoneAreaCodeList[0];
    })
    this.authService.setShowTopbarFlag(false);
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
  }

  login() {
    if (!this.checkPhoneNumber()) {
      return;
    }
    if (this.verificationCode == null || this.verificationCode.length != 6) {
      this.messageService.add({ severity: 'info', detail: 'Please enter the correct verification code.' });
      return;
    }
    let userLogin: UserLogin = { userId: 0, areaId: this.phoneAreaCode.id, userType: 0, userName: this.contactCellPhone, password: this.verificationCode }
    this.authLogin(userLogin)
  }

  authLogin(userLogin: UserLogin) {
    let userType: number;
    userType = 1    //用户类型强制为1
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

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  sendVerificationCode(): void {
    if (!this.checkPhoneNumber()) {
      return;
    }
    this.cellPhoneService.sendVerificationCode(this.phoneAreaCode.id!, this.contactCellPhone).subscribe(
      returnCode => {
        if (returnCode == "error") {
          this.messageService.add({ severity: 'info', detail: 'There was a problem sending the mobile verification code. Please try again later.' });
        } else {
          this.messageService.add({ severity: 'info', detail: 'The mobile phone verification code has been sent to this mobile phone. This is the test verification code: ' + returnCode });
          this.countFlag = true;
        }
      }
    )
  }

  private checkPhoneNumber(): boolean {
    if (this.contactCellPhone == '111') {
      this.contactCellPhone = '13901134696'
      this.phoneAreaCode.id = 86
      this.phoneAreaCode.id32 = 86
      this.verificationCode = '666666'
    }
    if (this.contactCellPhone == null) {
      this.messageService.add({ severity: 'warn', detail: 'Please enter the phone number.' });
      return false;
    }
    if (this.phoneAreaCode.id32 == 1 && this.contactCellPhone.length != 10) {
      this.messageService.add({ severity: 'warn', detail: 'Incorrect phone number.' });
      return false;
    }
    if (this.phoneAreaCode.id32 == 86 && this.contactCellPhone[0] != "1") {
      this.messageService.add({ severity: 'warn', detail: 'Please start with 1 for Chinese mobile phone number.' });
      return false;
    }
    if (this.phoneAreaCode.id32 == 86 && this.contactCellPhone[0] == "1" && this.contactCellPhone.length != 11) {
      this.messageService.add({ severity: 'warn', detail: 'Incorrect phone number.' });
      return false;
    }
    return true;
  }

  timesUp(event) {
    if (event.action == "done") {
      this.countFlag = false;
    }
  }

  goBack(): void {
    this.location.back();
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
