import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService, PrimeNGConfig } from 'primeng/api';
import { AuthService } from '../../auth/auth.service';
import { EmailService } from '../../services/system/email.service';
import { PersonInfoService } from '../../services/system/person-info.service';
import { PersonInfo } from '../../models/system/person-info';


@Component({
  selector: 'app-sign-up-success',
  templateUrl: './sign-up-success.component.html',
  styleUrls: ['./sign-up-success.component.css'],
  providers: [PersonInfoService, MessageService, EmailService],
})
export class SignUpSuccessComponent implements OnInit {

  userId: number;
  personInfo: PersonInfo
  verificationCode: string;
  verificationFlag: boolean = false

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private emailService: EmailService,
    private personInfoService: PersonInfoService,
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.userId <= 0 && this.authService.userClaims) {
      this.userId = this.authService.userClaims.userId
    }
    this.personInfoService.getPersonInfo(this.userId).subscribe(person => {
      this.personInfo = person
      this.userId = person.id
    })
  }

  goEdit(): void {
    this.router.navigate([`/person/edit/${this.userId}`]);
  }

  goHome(): void {
    this.router.navigate([`/`]);
  }

  sendCode() {
    this.emailService.sendVerificationCode(this.userId, 1, this.personInfo.email).subscribe(
      returnCode => {
        if (returnCode == "error") {
          this.messageService.add({ severity: 'info', detail: 'There was a problem sending the Email verification code. Please try again later.' });
        } else {
          this.messageService.add({ severity: 'info', detail: 'The Email verification code has been sent.' });
        }
      }
    )
  }

  verify() {
    if (this.verificationCode == null || this.verificationCode.length != 6) {
      this.messageService.add({ severity: 'info', detail: 'Please enter the correct verification code.' });
      return;
    }
    this.emailService.verifyEmailByCode(this.userId, this.verificationCode).subscribe(iRet => {
      if (iRet > 0) {
        this.messageService.add({ severity: 'info', detail: 'Verification complete.' });
        this.personInfo.emailConfirmed = 1
      } else if (iRet == 0) {
        this.messageService.add({ severity: 'info', detail: 'Email address has been verified.' });
      } else if (iRet == -9) {
        this.messageService.add({ severity: 'info', detail: 'Verification Code has expired.' });
      } else {
        this.messageService.add({ severity: 'info', detail: 'Verification error. ERR: ' + iRet });
      }
    })
  }
}
