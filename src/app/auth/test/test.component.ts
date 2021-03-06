import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import { environment } from '../../../environments/environment';
import { FaqInfo } from '../../models/system/faq-info';
import { PersonInfo } from '../../models/system/person-info';
import { CodeConversionService } from '../../services/system/code-conversion.service';
import { FaqInfoService } from '../../services/system/faq-info.service';
import { ProductInfoService } from '../../services/uplus/product-info.service';
import { PersonInfoService } from '../../services/system/person-info.service';
import { OrganizationService } from '../../services/system/organization.service';
import { AttachmentService } from '../../services/file/attachment.service';
import { PersonAttachment } from '../../models/system/person-attachment';
import { QueryCondition } from '../../models/system/query-condition';
import { ProductInfo } from '../../models/uplus/product-info';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers: [FaqInfoService, PersonInfoService, MessageService, CodeConversionService, OrganizationService, AttachmentService, ProductInfoService]
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
    private organizationService: OrganizationService,
    private attachmentService: AttachmentService,
    private productInfoService: ProductInfoService,
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

  //????????????OrganizationId???????????????
  test() {
    this.organizationService.getOrgFullName(7)
      .subscribe(iRet => {
        console.log("?????????????????????????????????", iRet);
      });
  }

  //????????????OrganizationId????????????????????????list
  getOrgListByParentId() {
    this.organizationService.getOrgListByParentId(3)
      .subscribe(iRet => {
        console.log("?????????????????????????????????", iRet);
      });
  }

  //????????????PersonId??????????????????list
  getPersonAttachmentByPersonId() {
    this.attachmentService.getPersonAttachmentByPersonId(this.personId)
      .subscribe(iRet => {
        console.log("??????????????????????????????", iRet);
      });
  }

  //????????????id?????????????????????
  updatePsersonAttachment() {
    let a: PersonAttachment;
    a = { id: 106, name: "Test Nameabc", sequence: 10, url: "URL test", description: "description" }
    this.attachmentService.updatePsersonAttachment(a)
      .subscribe(iRet => {
        console.log("AAAAAAAAAAAAAAA");
        console.log(iRet);
      });
  }

  //????????????id?????????????????????
  deletePersonAttachment() {
    this.attachmentService.deletePersonAttachment(105)
      .subscribe(iRet => {
        console.log("AAAAAAAAAAAAAAA");
        console.log(iRet);
      });
  }

  //??????????????????????????????
  //???????????????this.attachmentId?????????????????????????????????Id???dt=attach?????????type=0?????????????????????????????????????????????????????????????????????0???????????????????????????1???????????????2???????????????3???????????????
  openAttachment() {
    window.location.href = `${this.apiUrl}/filebyid/${this.attachmentId}?dt=attach&type=0`
  }

  //????????????????????????????????????????????????????????????
  getAttachmentPath() {
    this.attachmentService.getAttachmentSourceById(this.attachmentId, 0).subscribe(a => {
      this.attachmentPath = a
    });
  }

  //??????????????????
  testDeleteApiInfo() {
    this.productInfoService.deleteProductInfo(108)
      .subscribe(iRet => {
        console.log("AAAAAAAAAAAAAAA");
        console.log(iRet);
      });
  }

  //??????
  testUpdateStudent() {
    let a: ProductInfo;
    a = { id: 109, status: 1, code: "A009", name: "French Lesson11-A009b", originalName: "????????????22-A009c", description: "Great33-A002d"  }
    this.productInfoService.updateProductInfo(a)
      .subscribe(iRet => {
        console.log("AAAAAAAAAAAAAAA");
        console.log(iRet);
      });
  }

  //??????
  testAddStudent() {
    let a: ProductInfo;
    //????????????id???0
    a = { id: 0, code: "A003", name: "French Lesson3", originalName: "????????????3", description: "Great" }
    this.productInfoService.addProductInfo(a)
      .subscribe(iRet => {
        console.log("AAAAAAAAAAAAAAA");
        console.log(iRet);
      });
  }

  //??????????????????
  testGetTeacher() {
    this.productInfoService.getProductInfo(1)
        .subscribe(a => {
          console.log("AAAAAAAAAAAAAAA");
          console.log(a);
        });
  }

  //????????????
  testGetStudents() {
    this.productInfoService.getActivatedProductInfos()
      .subscribe(a => {
        console.log("AAAAAAAAAAAAAAA");
        console.log(a);
      });
  }

  //??????FAQ
  testGetAllFaqInfos() {
    this.faqInfoService.getAllFaqInfos()
      .subscribe(a => {
        console.log("AAAAAAAAAAAAAAA");
        console.log(a);
      });
  }

  //???????????????FAQ
  testGetActivatedFaqInfos() {
    this.faqInfoService.getActivatedFaqInfos()
      .subscribe(a => {
        console.log("AAAAAAAAAAAAAAA");
        console.log(a);
      });
  }

  //???????????????FAQ
  testGetFaqInfo() {
    this.faqInfoService.getFaqInfo(1)
      .subscribe(a => {
        console.log("AAAAAAAAAAAAAAA");
        console.log(a);
      });
  }

  //??????FAQ
  testAddFaqInfo() {
    let a: FaqInfo;
    //????????????id???0
    a = { id: 0, question: "Test Question?", answer: "Test Answer"}
    this.faqInfoService.addFaqInfo(a)
      .subscribe(iRet => {
        console.log("AAAAAAAAAAAAAAA");
        console.log(iRet);
      });
  }

  //??????FAQ
  testUpdateFaqInfo() {
    let a: FaqInfo;
    a = { id: 101, question: "Test Question Update?", answer: "Test Answer Changed" }
    this.faqInfoService.updateFaqInfo(a)
      .subscribe(iRet => {
        console.log("AAAAAAAAAAAAAAA");
        console.log(iRet);
      });
  }


  //??????FAQ
  testDeleteFaqInfo() {
    this.faqInfoService.deleteFaqInfo(101)
      .subscribe(iRet => {
        console.log("AAAAAAAAAAAAAAA");
        console.log(iRet);
      });
  }

  //????????????
  testGetTeacherList() {
    let q: QueryCondition = {
      //whereOr: [{ keyCode: "sex", operator: "=", description: "1" }, { keyCode: "sex", operator: "=", description: "0" }, { keyCode: "t1.addition_bigint", operator: ">", description: "0" }],
      orderBy: [{ keyCode: "po.id ", operator: "asc" }, { keyCode: "id", operator: "Desc" }],
      whereAnd: [{ keyCode: "p.first_name", operator: "=", description: "terry" }],
      pageNumber: 1,
      pageSize: 6
    }
    //????????????
    this.personInfoService.getTeachersCount(q).subscribe(count => {
        console.log("Total Count:", count)
    })

    this.personInfoService.getTeachersByQuery(q).subscribe(ts => {
      for (let t of ts) {
        t.profilePic = this.apiUrl + t.profilePic
      }
      console.log("????????????", ts)
    })
  }


  //????????????
  testStudentList() {
    let q: QueryCondition = {
      //whereOr: [{ keyCode: "sex", operator: "=", description: "1" }, { keyCode: "sex", operator: "=", description: "0" }, { keyCode: "t1.addition_bigint", operator: ">", description: "0" }],
      orderBy: [{ keyCode: "po.id ", operator: "asc" }, { keyCode: "id", operator: "Desc" }],
      //whereAnd: [{ keyCode: "p.first_name", operator: "=", description: "terry" }],
      pageNumber: 1,
      pageSize: 6
    }
    //????????????
    this.personInfoService.getStudentsCount(q).subscribe(count => {
      console.log("Total Count:", count)
    })

    this.personInfoService.getStudentsByQuery(q).subscribe(ts => {
      for (let t of ts) {
        t.profilePic = this.apiUrl + t.profilePic
      }
      console.log("????????????", ts)
    })
  }


  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }

}
