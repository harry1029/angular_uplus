import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

import { environment } from '../../../../environments/environment';

import { PersonInfo } from 'src/app/models/system/person-info';
import { PersonInfoService } from 'src/app/services/system/person-info.service';

import { CodeConversionService } from 'src/app/services/system/code-conversion.service';


@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css'],
  providers: [PersonInfoService, MessageService]
})
export class TeacherListComponent implements OnInit {

  apiUrl: string = environment.apiServerUrl + "/h";
  teachers: PersonInfo[];
  gender: { id: number, type: string }[] = [
    { id: 0, type: "Male" },
    { id: 1, type: "Female" },
    { id: 2, type: "Transgender" },
    { id: 3, type: "Non-binary" },
    { id: 4, type: "Prefer not to say" },
  ];

  selected: PersonInfo;

  constructor(
    private personInfoService: PersonInfoService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private messageService: MessageService,

  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.getTeachers();
  }

  getTeachers(): void {
    this.personInfoService.getTeachers()
      .subscribe(teachers => {
        this.teachers = teachers;
        console.log("teachers: ", teachers);
      });
  }

  deleteTeacher(teacher: PersonInfo): void {
    this.personInfoService.deletePersonInfo(teacher.id).subscribe(
      deleteN => {
        if (deleteN > 0) {
          let message = 'Teacher "' + this.selected.firstName + " " + this.selected.lastName + '" has been successfully deleted.'
          this.messageService.clear();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: message, life: 10000 });
          this.getTeachers();
        } else {
          this.messageService.clear();
          this.messageService.add({ severity: 'info', summary: 'Info', detail: 'No teacher has been deleted.', life: 10000 });
        }
      });
  }

  deleteConfirm(teacher: PersonInfo) {
    this.selected = teacher;
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Delete Teacher' });
  }


  onConfirm() {
    this.deleteTeacher(this.selected);
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }

  insert() {
    this.router.navigate([`/manage/teacherinsert`]);
  }

  edit(teacher: PersonInfo) {
    this.selected = teacher;
    this.router.navigate([`/manage/teacheredit/${teacher.id}`]);
  }

  detail(teacher: PersonInfo) {
    this.selected = teacher;
    this.router.navigate([`/manage/teacherdetail/${teacher.id}`]);
  }

  attachment(teacher: PersonInfo) {
    this.selected = teacher;
    this.router.navigate([`/manage/teacherattach/${teacher.id}`]);
  }

}
