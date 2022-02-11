import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';
import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { AuthService } from '../../auth/auth.service';
import { UploadFileLogService } from '../../services/file/upload-file-log.service';

import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-profile-photo',
    templateUrl: './profile-photo.component.html',
    styleUrls: ['./profile-photo.component.css'],
    providers: [UploadFileLogService, MessageService],
})
export class ProfilePhotoComponent implements OnInit {

    private apiUrl: string = environment.apiServerUrl;

    imageChangedEvent: any = '';
    croppedImage: any = '';
    imageData: Blob;

    buttonFlag: boolean = true
    userId: number;

    constructor(
        public authService: AuthService,
        private route: ActivatedRoute,
        private primengConfig: PrimeNGConfig,
        private messageService: MessageService,
        private location: Location,
        private uploadFileLogService: UploadFileLogService,
    ) { }

    ngOnInit(): void {
        this.primengConfig.ripple = true;
        this.userId = Number(this.route.snapshot.paramMap.get('id'));
    }

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        this.imageData = base64ToFile(this.croppedImage);
    }

    imageLoaded() {
    }

    cropperReady() {
        console.log('Cropper ready');
    }

    loadImageFailed() {
        console.log('Load failed');
    }

    getImageData() {
        this.buttonFlag = false;
        var fd = new FormData()
        fd.append('image', this.imageData)
        fd.append('userid', String(this.userId))
        fd.append('picturetype', "1")
        // Upload
        this.uploadFileLogService.uploadFileData(fd).subscribe(
            ret => {
                this.buttonFlag = true;
                if (ret.id > 0) {
                    this.authService.updateUserClaims()
                    this.goBack()
                }
                this.messageService.add({ severity: 'warn', detail: "图片上传时遇到服务器端错误：" + ret.message });
            }
        ) 
    }

    goBack(): void {
        this.location.back();
    }

}
