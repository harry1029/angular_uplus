import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { MessageService, PrimeNGConfig } from 'primeng/api';
import { EmailService } from '../../services/system/email.service';

@Component({
  selector: 'app-verifyemail',
  templateUrl: './verifyemail.component.html',
  styleUrls: ['./verifyemail.component.css'],
  providers: [MessageService, EmailService],
})
export class VerifyemailComponent implements OnInit {

  userId: number;
  key: string;
  message: string;

  constructor(
    private route: ActivatedRoute,
    private primengConfig: PrimeNGConfig,
    private location: Location,
    private router: Router,
    private emailService: EmailService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.route.queryParams.subscribe(params => {
      this.key = params['key'];
    });
    if (this.userId <= 0 || this.key == null || this.key.length < 30) {
      this.message = "The verification link is not correct."
      return 
    }
    this.emailService.verifyEmailByLink(this.userId, this.key).subscribe(iRet => {
      if (iRet > 0) {
        this.message = "Verification complete."
      } else if (iRet == 0) {
        this.message = "Email address has been verified."
      } else if (iRet == -9) {
        this.message = "Verification Link has expired."
      } else if (iRet < 0 && iRet > -8) {
        console.log("verifyEmailByLink return value: ", iRet)
        this.message = "Invalid verification link."
      } else {
        this.message = "Verification error. ERR: " + iRet
      }
    })
  }

  goHome(): void {
    this.router.navigate([`/`]);
  }

}
