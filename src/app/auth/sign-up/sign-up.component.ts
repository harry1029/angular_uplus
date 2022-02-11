import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Location } from '@angular/common';

import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

import { AuthService } from '../auth.service';
import { UserLogin } from '../../models/system/user-login';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [MessageService]
})
export class SignUpComponent implements OnInit {

  userEmail: string;
  userName: string;
  userPassword: string;

  constructor(
    public authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private location: Location,
    private primengConfig: PrimeNGConfig,
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  signup() {
    if (this.userEmail == null || this.userEmail.trim().length < 6) {
      this.messageService.add({ severity: 'info', detail: 'Please enter the correct Email address.' });
      return;
    }
    if (this.userPassword == null || this.userPassword.length < 6) {
      this.messageService.add({ severity: 'info', detail: 'Password must have at least 6 characters.' });
      return;
    }
    let userLogin: UserLogin = { userId: 61, areaId: 0, userType: 0, userName: this.userEmail, password: this.userPassword }
    this.authSignup(userLogin)
  }

  authSignup(userLogin: UserLogin) {
    let userType: number;
    userType = 1    //用户类型强制为1
    userLogin.userType = userType
    this.authService.login(userLogin).subscribe(userLogin => {
      if (userLogin.userId > 0) {
        this.router.navigate([`/signin-success/${userLogin.userId}`]);
      } else if (userLogin.userId == -1) {
        this.messageService.add({ severity: 'info', detail: 'User login failed!' });
      } else if (userLogin.userId == -2) {
        this.messageService.add({ severity: 'info', detail: '用户登录失败: 登录身份不符！' });
      } else {
        this.messageService.add({ severity: 'info', detail: 'User login failed! ERR:' + userLogin.userId.toString() });
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

}
