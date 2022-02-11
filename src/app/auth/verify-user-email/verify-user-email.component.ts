import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { MessageService, PrimeNGConfig } from 'primeng/api';
import { EmailService } from '../../services/system/email.service';
import { PersonalInfoService } from '../../services/system/personal-info.service';
import { PersonalInfo } from '../../models/system/personal-info';

@Component({
  selector: 'app-verify-user-email',
  templateUrl: './verify-user-email.component.html',
  styleUrls: ['./verify-user-email.component.css'],
  providers: [PersonalInfoService, MessageService, EmailService],
})
export class VerifyUserEmailComponent implements OnInit {
  userId: number;
  personalInfo: PersonalInfo
  verificationCode: string;
  verificationFlag: boolean = false

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private emailService: EmailService,
    private personalInfoService: PersonalInfoService,
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.userId <= 0) {
      return
    }
    this.personalInfoService.getPersonalInfo(this.userId).subscribe(person => {
      this.personalInfo = person
    })
  }

  sendCode() {
    this.emailService.sendVerificationCode(this.userId, 1, this.personalInfo.email).subscribe(
      returnCode => {
        if (returnCode == "error") {
          this.messageService.add({ severity: 'info', detail: 'There was a problem sending the Email verification code. Please try again later.' });
        } else {
          this.messageService.add({ severity: 'info', detail: 'The Email verification code has been sent.'});
        }
      }
    )

  }

  verify() {
    if (this.verificationCode == null || this.verificationCode.length != 6) {
      this.messageService.add({ severity: 'info', detail: 'Please enter the correct verification code.' });
      return;
    }
    if (this.userId <= 0) {
      this.messageService.add({ severity: 'info', detail: 'User Id is not correct.' });
      return;
    }
    this.emailService.verifyEmailByCode(this.userId, this.verificationCode).subscribe(iRet => {
      if (iRet > 0) {
        this.messageService.add({ severity: 'info', detail: 'Verification complete.' });
        this.personalInfo.emailConfirmed = 1
      } else if (iRet == 0) {
        this.messageService.add({ severity: 'info', detail: 'Email address has been verified.' });
        console.log("verifyEmailByCode return value: ", iRet)
      } else if (iRet == -9) {
        this.messageService.add({ severity: 'info', detail: 'Verification Code has expired.' });
      } else {
        this.messageService.add({ severity: 'info', detail: 'Verification error. ERR: ' + iRet });
      }
    })
  }

  goBack(): void {
    this.location.back();
  }

}
