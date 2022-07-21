import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { FaqInfo } from '../../../models/system/faq-info';
import { FaqInfoService } from '../../../services/system/faq-info.service';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.css'],
  providers: [FaqInfoService, MessageService],
})
export class FaqListComponent implements OnInit {
  apiUrl: string = environment.apiServerUrl + '/h';
  faqs: FaqInfo[];

  selected: FaqInfo;

  constructor(
    private faqInfoService: FaqInfoService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.getFaqInfos();
  }

  getFaqInfos(): void {
    this.faqInfoService.getAllFaqInfos().subscribe((faqs) => {
      this.faqs = faqs;
      console.log('faqs: ', faqs);
    });
  }

  deleteFaq(faq: FaqInfo): void {
    this.faqInfoService.deleteFaqInfo(faq.id).subscribe((deleteN) => {
      if (deleteN > 0) {
        let message =
          'Faq "' +
          this.selected.question +
          ' ' +
          this.selected.answer +
          '" has been successfully deleted.';
        this.messageService.clear();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: message,
          life: 10000,
        });
        this.getFaqInfos();
      } else {
        this.messageService.clear();
        this.messageService.add({
          severity: 'info',
          summary: 'Info',
          detail: 'No faq has been deleted.',
          life: 10000,
        });
      }
    });
  }

  deleteConfirm(faq: FaqInfo) {
    this.selected = faq;
    this.messageService.clear();
    this.messageService.add({
      key: 'c',
      sticky: true,
      severity: 'warn',
      summary: 'Are you sure?',
      detail: 'Delete FAQ',
    });
  }

  onConfirm() {
    this.deleteFaq(this.selected);
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }

  insert() {
    this.router.navigate([`/manage/faqinsert`]);
  }

  edit(faq: FaqInfo) {
    this.selected = faq;
    this.router.navigate([`/manage/faqedit/${faq.id}`]);
  }

  detail(faq: FaqInfo) {
    this.selected = faq;
    this.router.navigate([`/manage/faqdetail/${faq.id}`]);
  }
}
