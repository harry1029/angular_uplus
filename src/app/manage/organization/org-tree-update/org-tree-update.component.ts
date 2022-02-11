import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

import { OrganizationService } from '../../../services/system/organization.service';
import { OrgTree } from '../../../models/system/org-tree';

@Component({
  selector: 'app-org-tree-update',
  templateUrl: './org-tree-update.component.html',
    styleUrls: ['./org-tree-update.component.css'],
    providers: [MessageService, OrganizationService]
})
export class OrgTreeUpdateComponent implements OnInit {

    @Output() private operateResult = new EventEmitter();
    @Input() orgId: number;
    item: OrgTree;
    parentItem: OrgTree;
    buttonFlag: boolean = true;     //���ڿ����ύ��ť����ʾ�������ظ��ύ��
    status: boolean = true;
    divisionFlag: boolean = false;

    constructor(
        private primengConfig: PrimeNGConfig,
        private messageService: MessageService,
        private organizationService: OrganizationService,
    ) { }

    ngOnInit(): void {
        this.primengConfig.ripple = true;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.item = null;
        this.parentItem = null;
        this.getItem();
    }

    //��ȡ���ڵ�
    private getItem() {
        this.organizationService.getOrg(this.orgId)
            .subscribe(item => {
                this.item = item
                this.getParent()
                this.status = this.item.status > 0
                this.divisionFlag = this.item.divisionFlag > 0
            });
    }

    //��ȡ���ڵ�
    private getParent() {
        this.organizationService.getOrg(this.item.parentId)
            .subscribe(item => {
                this.parentItem = item
            });
    }

    submit() {

        if (this.item.name == null || this.item.name.trim().length < 1) {
            this.messageService.add({ severity: 'warn', detail: "��λ������Ϊ��" });
            return;
        }
        if (this.status) {
            this.item.status = 1
        } else {
            this.item.status = 0
        }
        if (this.divisionFlag) {
            this.item.divisionFlag = 1
        } else {
            this.item.divisionFlag = 0
        }
        this.buttonFlag = false;
        this.organizationService.updateOrg(this.item).subscribe(iRet => {
            this.buttonFlag = true;
            if (iRet > 0) {
                this.operateResult.emit(iRet);
            } else if (iRet == 0) {
                this.messageService.add({ severity: 'info', detail: this.item.name + " ��λ��Ϣ����ʧ�ܣ�������" });
            } else {
                this.messageService.add({ severity: 'error', detail: "�������ڲ����ִ������Ժ�����" });
            }
        })
    }

    goBack(): void {
        this.operateResult.emit(0);
    }
}
