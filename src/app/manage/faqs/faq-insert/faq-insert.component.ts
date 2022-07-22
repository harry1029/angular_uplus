import { Component, OnInit } from '@angular/core';
import { FaqInfo } from 'src/app/models/system/faq-info';

import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FaqInfoService } from 'src/app/services/system/faq-info.service';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-faq-insert',
  templateUrl: './faq-insert.component.html',
  styleUrls: ['./faq-insert.component.css'],
  providers: [FaqInfoService, MessageService],
})
export class FaqInsertComponent implements OnInit {
  faq: FaqInfo;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private faqInfoService: FaqInfoService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.faq = {
      id: 0,
      status: 1,
      sequence: 0,
      question: '',
      answer: '',
      description: '',
    };
  }

  submit() {
    this.faqInfoService.addFaqInfo(this.faq).subscribe((iRet) => {
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
