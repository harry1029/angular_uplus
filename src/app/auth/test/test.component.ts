import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import { environment } from '../../../environments/environment';
import { FaqInfo } from '../../models/system/faq-info';
import { PersonInfo } from '../../models/system/person-info';
import { CodeConversionService } from '../../services/system/code-conversion.service';
import { FaqInfoService } from '../../services/system/faq-info.service';
import { PersonInfoService } from '../../services/system/person-info.service';
import { AttachmentService } from '../../services/file/attachment.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers: [FaqInfoService, PersonInfoService, MessageService, CodeConversionService, AttachmentService]
})
export class TestComponent implements OnInit {

  apiUrl: string = environment.apiServerUrl;

  uploadedFiles: any[] = [];
  styleColor = "#0090B9"

  personId = 118
  attachmentId = 117
  attachmentPath: string

  constructor(
    private messageService: MessageService,
    private personInfoService: PersonInfoService,
    private faqInfoService: FaqInfoService,
    private codeConversionService: CodeConversionService,
    private attachmentService: AttachmentService,
  ) { }

  ngOnInit(): void {
    this.getAttachmentPath()
  }

  testCode() {
    this.codeConversionService.getCodeValues(100010)
      .subscribe(codeList => {
        console.log("API Method List: ", codeList);
      });
    this.codeConversionService.getCodeValue(100010, 2)
      .subscribe(codeList => {
        console.log("API Method Value: ", codeList);
      });
  }

  //获取指定PersonId下的所有附件list
  test() {
    this.attachmentService.getPersonAttachmentByPersonId(this.personId)
      .subscribe(iRet => {
        console.log("该人的所有附件信息：", iRet);
      });
  }

  //直接打开的附件，链接
  //参数说明：this.attachmentId中存放当前要打开的附件Id。dt=attach必须。type=0是默认的，也可以不写，它尽在图片附件是才生效，0表示取最小的图片，1表示大图，2表示中图，3表示原图。
  openAttachment() {
    window.location.href = `${this.apiUrl}/filebyid/${this.attachmentId}?dt=attach&type=0`
  }

  //得到附件的路径，用于图片直接在页面中打开
  getAttachmentPath() {
    this.attachmentService.getAttachmentSourceById(this.attachmentId, 0).subscribe(a => {
      this.attachmentPath = a
    });
  }

  //删除教师信息
  testDeleteApiInfo() {
    this.personInfoService.deletePersonInfo(109)
      .subscribe(iRet => {
        console.log("AAAAAAAAAAAAAAA");
        console.log(iRet);
      });
  }

  //修改教师信息
  testUpdateTeacher() {
    let a: PersonInfo;
    a = { id: 0, firstName: "Test Nameabc", lastName: "Last123", phoneAreaId: 86, phoneNumber: "13901011234" }
    this.personInfoService.updatePersonInfo(a)
      .subscribe(iRet => {
        console.log("AAAAAAAAAAAAAAA");
        console.log(iRet);
      });
  }

  //增加教师
  testAddTeacher() {
    let a: PersonInfo;
    //增加时，id为0
    a = { id: 0, firstName: "Test Name", lastName: "Last", phoneAreaId: 86, phoneNumber: "13901011234" }
    this.personInfoService.addTeacher(a)
      .subscribe(iRet => {
        console.log("AAAAAAAAAAAAAAA");
        console.log(iRet);
      });
  }

  //获取指定教师信息
  testGetTeacher() {
    this.personInfoService.getPersonInfo(107)
        .subscribe(a => {
          console.log("AAAAAAAAAAAAAAA");
          console.log(a);
        });
  }

  //所有教师
  testGetTeachers() {
    this.personInfoService.getTeachers()
      .subscribe(a => {
        console.log("AAAAAAAAAAAAAAA");
        console.log(a);
      });
  }

  //所有FAQ
  testGetAllFaqInfos() {
    this.faqInfoService.getAllFaqInfos()
      .subscribe(a => {
        console.log("AAAAAAAAAAAAAAA");
        console.log(a);
      });
  }

  //所有激活的FAQ
  testGetActivatedFaqInfos() {
    this.faqInfoService.getActivatedFaqInfos()
      .subscribe(a => {
        console.log("AAAAAAAAAAAAAAA");
        console.log(a);
      });
  }

  //得到指定的FAQ
  testGetFaqInfo() {
    this.faqInfoService.getFaqInfo(1)
      .subscribe(a => {
        console.log("AAAAAAAAAAAAAAA");
        console.log(a);
      });
  }

  //增加FAQ
  testAddFaqInfo() {
    let a: FaqInfo;
    //增加时，id为0
    a = { id: 0, question: "Test Question?", answer: "Test Answer"}
    this.faqInfoService.addFaqInfo(a)
      .subscribe(iRet => {
        console.log("AAAAAAAAAAAAAAA");
        console.log(iRet);
      });
  }

  //修改FAQ
  testUpdateFaqInfo() {
    let a: FaqInfo;
    a = { id: 101, question: "Test Question Update?", answer: "Test Answer Changed" }
    this.faqInfoService.updateFaqInfo(a)
      .subscribe(iRet => {
        console.log("AAAAAAAAAAAAAAA");
        console.log(iRet);
      });
  }


  //删除FAQ
  testDeleteFaqInfo() {
    this.faqInfoService.deleteFaqInfo(101)
      .subscribe(iRet => {
        console.log("AAAAAAAAAAAAAAA");
        console.log(iRet);
      });
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }

}
