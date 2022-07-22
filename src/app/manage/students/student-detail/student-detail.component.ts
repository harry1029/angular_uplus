import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { PersonInfo } from 'src/app/models/system/person-info';
import { PersonInfoService } from 'src/app/services/system/person-info.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css'],
  providers: [MessageService, PersonInfoService],
})
export class StudentDetailComponent implements OnInit {
  studentId: number;
  student: PersonInfo;
  gender: { id: number; type: string }[] = [
    { id: 0, type: 'Male' },
    { id: 1, type: 'Female' },
    { id: 2, type: 'Transgender' },
    { id: 3, type: 'Non-binary' },
    { id: 4, type: 'Prefer not to say' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personInfoService: PersonInfoService,
    private location: Location,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.studentId <= 0) {
      this.messageService.add({
        severity: 'warn',
        detail: 'Wrong Student Id!',
      });
      this.goBack();
    }

    this.personInfoService.getPersonInfo(this.studentId).subscribe((h) => {
      if (h.id <= 0) {
        this.messageService.add({
          severity: 'warn',
          detail: 'Wrong Student Id!',
        });
        this.goBack();
      }
      this.student = h;
    });
  }

  goBack(): void {
    this.location.back();
  }
}
