import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

import { environment } from '../../../environments/environment';
import { UploadFileLogStru } from '../../models/file/upload-file-log';
import { UploadFileLogService } from '../../services/file/upload-file-log.service';



@Component({
    selector: 'app-file-list',
    templateUrl: './file-list.component.html',
    styleUrls: ['./file-list.component.css'],
    providers: [UploadFileLogService, MessageService],
})
export class FileListComponent implements OnInit {

    apiUrl: string = environment.apiServerUrl + "/files/";
    uploadFileLogStrus: UploadFileLogStru[];
    selected: UploadFileLogStru;

    constructor(
        private uploadFileLogService: UploadFileLogService,
        private primengConfig: PrimeNGConfig,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.primengConfig.ripple = true;
        this.getUploadFileLogStrus();
    }

    getUploadFileLogStrus(): void {
        this.uploadFileLogService.getUploadFileLogStrus()
            .subscribe(uploadFileLogStrus => {
                this.uploadFileLogStrus = uploadFileLogStrus;
            });
    }

    deleteFile(u: UploadFileLogStru): void {
        this.uploadFileLogService.deleteUploadFileLogStru(u).subscribe(
            deleteN => {
                if (deleteN > 0) {
                    let message = 'The file "' + this.selected.storageFileName + this.selected.fileNameExtension + '" has been successfully deleted.'
                    if (deleteN == 100) {
                        message = 'The file "' + this.selected.storageFileName + this.selected.fileNameExtension + '" has been totally deleted.'
                    }
                    this.messageService.clear();
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: message, life: 10000 });
                    this.getUploadFileLogStrus();
                } else {
                    this.messageService.clear();
                    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'No file has been deleted.', life: 10000  });
                }
            });
    }

    deleteConfirm(u: UploadFileLogStru) {
        this.selected = u;
        this.messageService.clear();
        this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Delete the file' });
    }

    onConfirm() {
        this.deleteFile(this.selected);
        this.messageService.clear('c');
    }

    onReject() {
        this.messageService.clear('c');
    }

}

