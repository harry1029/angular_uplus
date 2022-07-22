import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

import { environment } from '../../../../environments/environment';

import { PersonInfo } from 'src/app/models/system/person-info';
import { PersonInfoService } from 'src/app/services/system/person-info.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  providers: [PersonInfoService, MessageService],
})
export class StudentListComponent implements OnInit {
  apiUrl: string = environment.apiServerUrl + '/h';
  students: PersonInfo[];
  gender: { id: number; type: string }[] = [
    { id: 0, type: 'Male' },
    { id: 1, type: 'Female' },
    { id: 2, type: 'Transgender' },
    { id: 3, type: 'Non-binary' },
    { id: 4, type: 'Prefer not to say' },
    { id: 5, type: 'Unspecified' },
  ];

  selected: PersonInfo;

  constructor(
    private personInfoService: PersonInfoService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.getStudents();
  }

  getStudents(): void {
    this.personInfoService.getStudents().subscribe((students) => {
      this.students = students;
      console.log('students: ', students);
    });
  }

  deleteStudent(student: PersonInfo): void {
    this.personInfoService.deletePersonInfo(student.id).subscribe((deleteN) => {
      if (deleteN > 0) {
        let message =
          'Student "' +
          this.selected.firstName +
          ' ' +
          this.selected.lastName +
          '" has been successfully deleted.';
        this.messageService.clear();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: message,
          life: 10000,
        });
        this.getStudents();
      } else {
        this.messageService.clear();
        this.messageService.add({
          severity: 'info',
          summary: 'Info',
          detail: 'No student has been deleted.',
          life: 10000,
        });
      }
    });
  }

  deleteConfirm(student: PersonInfo) {
    this.selected = student;
    this.messageService.clear();
    this.messageService.add({
      key: 'c',
      sticky: true,
      severity: 'warn',
      summary: 'Are you sure?',
      detail: 'Delete Student',
    });
  }

  onConfirm() {
    this.deleteStudent(this.selected);
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }

  insert() {
    this.router.navigate([`/manage/studentinsert`]);
  }

  edit(student: PersonInfo) {
    this.selected = student;
    this.router.navigate([`/manage/studentedit/${student.id}`]);
  }

  detail(student: PersonInfo) {
    this.selected = student;
    this.router.navigate([`/manage/studentdetail/${student.id}`]);
  }

  attachment(student: PersonInfo) {
    this.selected = student;
    this.router.navigate([`/manage/studentattach/${student.id}`]);
  }
}
