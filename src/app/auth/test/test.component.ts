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

  //获取指定OrganizationId的完整名称
  test() {
    this.organizationService.getOrgFullName(7)
      .subscribe(iRet => {
        console.log("该部门下的所有子部门：", iRet);
      });
  }

  //获取指定OrganizationId下的所有孩子部门list
  getOrgListByParentId() {
    this.organizationService.getOrgListByParentId(3)
      .subscribe(iRet => {
        console.log("该部门下的所有子部门：", iRet);
      });
  }

  //获取指定PersonId下的所有附件list
  getPersonAttachmentByPersonId() {
    this.attachmentService.getPersonAttachmentByPersonId(this.personId)
      .subscribe(iRet => {
        console.log("该人的所有附件信息：", iRet);
      });
  }

  //修改给定id的个人附件信息
  updatePsersonAttachment() {
    let a: PersonAttachment;
    a = { id: 106, name: "Test Nameabc", sequence: 10, url: "URL test", description: "description" }
    this.attachmentService.updatePsersonAttachment(a)
      .subscribe(iRet => {
        console.log("AAAAAAAAAAAAAAA");
        console.log(iRet);
      });
  }

  //删除给定id的个人附件信息
  deletePersonAttachment() {
    this.attachmentService.deletePersonAttachment(105)
      .subscribe(iRet => {
        console.log("AAAAAAAAAAAAAAA");
        console.log(iRet);
      });
  }

  //直接打开的附件，链接
  //参数说明：this.attachmentId中存放当前要打开的附件Id。dt=attach必须。type=0是默认的，也可以不写，它只在图片附件时才生效，0表示取最小的图片，1表示大图，2表示中图，3表示原图。
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
    this.productInfoService.deleteProductInfo(108)
      .subscribe(iRet => {
        console.log("AAAAAAAAAAAAAAA");
        console.log(iRet);
      });
  }

  //修改
  testUpdateStudent() {
    let a: ProductInfo;
    a = { id: 109, status: 1, code: "A009", name: "French Lesson11-A009b", originalName: "法语课程22-A009c", description: "Great33-A002d"  }
    this.productInfoService.updateProductInfo(a)
      .subscribe(iRet => {
        console.log("AAAAAAAAAAAAAAA");
        console.log(iRet);
      });
  }

  //增加
  testAddStudent() {
    let a: ProductInfo;
    //增加时，id为0
    a = { id: 0, code: "A003", name: "French Lesson3", originalName: "法语课程3", description: "Great" }
    this.productInfoService.addProductInfo(a)
      .subscribe(iRet => {
        console.log("AAAAAAAAAAAAAAA");
        console.log(iRet);
      });
  }

  //获取指定信息
  testGetTeacher() {
    this.productInfoService.getProductInfo(1)
        .subscribe(a => {
          console.log("AAAAAAAAAAAAAAA");
          console.log(a);
        });
  }

  //所有测试
  testGetStudents() {
    this.productInfoService.getActivatedProductInfos()
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

  //教师查询
  testGetTeacherList() {
    let q: QueryCondition = {
      //whereOr: [{ keyCode: "sex", operator: "=", description: "1" }, { keyCode: "sex", operator: "=", description: "0" }, { keyCode: "t1.addition_bigint", operator: ">", description: "0" }],
      orderBy: [{ keyCode: "po.id ", operator: "asc" }, { keyCode: "id", operator: "Desc" }],
      whereAnd: [{ keyCode: "p.first_name", operator: "=", description: "terry" }],
      pageNumber: 1,
      pageSize: 6
    }
    //计算总数
    this.personInfoService.getTeachersCount(q).subscribe(count => {
        console.log("Total Count:", count)
    })

    this.personInfoService.getTeachersByQuery(q).subscribe(ts => {
      for (let t of ts) {
        t.profilePic = this.apiUrl + t.profilePic
      }
      console.log("教师查询", ts)
    })
  }


  //学生查询
  testStudentList() {
    let q: QueryCondition = {
      //whereOr: [{ keyCode: "sex", operator: "=", description: "1" }, { keyCode: "sex", operator: "=", description: "0" }, { keyCode: "t1.addition_bigint", operator: ">", description: "0" }],
      orderBy: [{ keyCode: "po.id ", operator: "asc" }, { keyCode: "id", operator: "Desc" }],
      //whereAnd: [{ keyCode: "p.first_name", operator: "=", description: "terry" }],
      pageNumber: 1,
      pageSize: 6
    }
    //计算总数
    this.personInfoService.getStudentsCount(q).subscribe(count => {
      console.log("Total Count:", count)
    })

    this.personInfoService.getStudentsByQuery(q).subscribe(ts => {
      for (let t of ts) {
        t.profilePic = this.apiUrl + t.profilePic
      }
      console.log("教师查询", ts)
    })
  }


  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }

}
