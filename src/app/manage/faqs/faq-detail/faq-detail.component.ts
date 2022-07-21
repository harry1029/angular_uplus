import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { FaqInfo } from '../../../models/system/faq-info';
import { FaqInfoService } from '../../../services/system/faq-info.service';

@Component({
  selector: 'app-faq-detail',
  templateUrl: './faq-detail.component.html',
  styleUrls: ['./faq-detail.component.css'],
  providers: [MessageService, FaqInfoService],
})
export class FaqDetailComponent implements OnInit {
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
      // this.codeConversionService.getCodeValue(100010, this.api.apiMethod)
      //   .subscribe(codeValueDescription => {
      //     this.codeValueDescription = codeValueDescription;
      //   });

      console.log(this.faq);
      // this.test();
    });
  }
  goBack(): void {
    this.location.back();
  }
}
