import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { FaqInfo } from '../../../models/system/faq-info';
import { FaqInfoService } from '../../../services/system/faq-info.service';

@Component({
  selector: 'app-faq-edit',
  templateUrl: './faq-edit.component.html',
  styleUrls: ['./faq-edit.component.css'],
  providers: [MessageService, FaqInfoService],
})
export class FaqEditComponent implements OnInit {
  faqId: number;
  faq: FaqInfo;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private faqInfoService: FaqInfoService,
    private location: Location,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.faqId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.faqId <= 0) {
      this.messageService.add({
        severity: 'warn',
        detail: 'Wrong FAQ Id!',
      });
      this.goBack();
    }
    this.faqInfoService.getFaqInfo(this.faqId).subscribe((h) => {
      if (h.id <= 0) {
        this.messageService.add({
          severity: 'warn',
          detail: 'Wrong FAQ Id!',
        });
        this.goBack();
      }
      this.faq = h;
      console.log(this.faq);
    });
    this.faq = {
      id: 0,
      status: 0,
      sequence: 0,
      question: '',
      answer: '',
      description: '',
    };
  }

  submit() {
    // if (this.api.apiPath == null || this.api.apiPath.trim().length < 1) {
    //   this.messageService.add({ severity: 'warn', detail: "apiPath is mandatory." });
    //   return;
    // }
    this.faqInfoService.updateFaqInfo(this.faq).subscribe((iRet) => {
      if (iRet > 0) {
        console.log(this.faq);
        this.router.navigate(['/manage/faqs']);
      } else if (iRet == 0) {
        this.messageService.add({ severity: 'info', detail: 'Save failed.' });
      } else {
        this.messageService.add({
          severity: 'error',
          detail: 'An error occurred in the server',
        });
        console.log(this.faq);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
