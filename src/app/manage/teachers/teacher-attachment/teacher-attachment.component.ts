import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

import { PersonAttachment } from 'src/app/models/system/person-attachment';
import { AttachmentService } from 'src/app/services/file/attachment.service';

import { CodeConversionService } from 'src/app/services/system/code-conversion.service';

@Component({
  selector: 'app-teacher-attachment',
  templateUrl: './teacher-attachment.component.html',
  styleUrls: ['./teacher-attachment.component.css'],
  providers: [MessageService, AttachmentService, CodeConversionService],
})
export class TeacherAttachmentComponent implements OnInit {

  apiUrl: string = environment.apiServerUrl;
  attachmentPath: string;
  selected: PersonAttachment;

  teacherId: number;
  uploadedFiles: any[] = [];
  filesList: PersonAttachment[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private attachmentService: AttachmentService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private codeConversionService: CodeConversionService,
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.teacherId = Number(this.route.snapshot.paramMap.get('id'));
    this.getPersonAttachments();
  }

  getPersonAttachments(): void {
    this.attachmentService.getPersonAttachmentByPersonId(this.teacherId)
      .subscribe(list => {
        this.filesList = list;
      });
  }

  getFileType(file: PersonAttachment) {
    const imageTypes: string[] = ['jpg', 'png', 'gif', 'webp', 'tiff', 'psd', 'raw', 'bmp', 'heif', 'indd'];
    const videoTypes: string[] = ['mp4', 'wmv', 'avi', 'mkv', 'flv', 'mkv', 'mov'];
    const extension: string = file.name.split('.').pop();

    if(imageTypes.includes(extension)) {
      return 311;
    } else if(videoTypes.includes(extension)) {
      return 312;
    } else return 313;
  }

  myUploader(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
    this.getPersonAttachments();
  }

  imgPreview(file: PersonAttachment) {
    let img = document.getElementsByClassName('p-image-preview')[0];
    if (file.fileType == 1) {
      img['src'] = `${this.apiUrl}/filebyid/${file.attachmentId}?dt=attach&type=3`;
    }
    else if (file.fileType == 2 || file.fileType == 11 || file.fileType == 15) {
      open(`${this.apiUrl}/filebyid/${file.attachmentId}?dt=attach&type=0`, '_self');
    }
  }

  //删除给定id的个人附件信息
  deleteFile(file: PersonAttachment): void {
    this.attachmentService.deletePersonAttachment(file.id)
      .subscribe(iRet => {
        if (iRet > 0) {
          let message = 'The file "' + this.selected.name + '" has been successfully deleted.'
          this.messageService.clear();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: message, life: 10000 });
          this.getPersonAttachments();
        } else {
          this.messageService.clear();
          this.messageService.add({ severity: 'info', summary: 'Info', detail: 'No file has been deleted.', life: 10000 });
        }
      });
  }

  deleteConfirm(file: PersonAttachment) {
    this.selected = file;
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Delete File' });
  }

  onConfirm() {
    this.deleteFile(this.selected);
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }

}
