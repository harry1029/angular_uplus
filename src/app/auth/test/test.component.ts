import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css'],
    providers: [MessageService]
})
export class TestComponent implements OnInit {

    uploadedFiles: any[] = [];
    styleColor = "#0090B9"

    constructor(
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
    }

    test() {
        let name = "xiamanminmmmm"
        //this.heroService.addMenuItem()
        //    .subscribe(hero => {
        //        console.log("TTTTTTTTTTTTTTTTTTTT");
        //        console.log(hero);
        //    });
    }

    onUpload(event) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
    }

}
