import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

import { OrganizationService } from '../../../services/system/organization.service';
import { OrgTree } from '../../../models/system/org-tree';

@Component({
    selector: 'app-org-tree-insert',
    templateUrl: './org-tree-insert.component.html',
    styleUrls: ['./org-tree-insert.component.css'],
    providers: [MessageService, OrganizationService]
})
export class OrgTreeInsertComponent implements OnInit {

    @Output() private operateResult = new EventEmitter();
    @Input() orgId: number;
    item: OrgTree;
    parentItem: OrgTree;
    buttonFlag: boolean = true;     //用于控制提交按钮的显示，避免重复提交。
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
        this.item = { id: 0, parentId: this.orgId };
        this.getParent()
    }

    //获取父节点
    private getParent() {
        this.organizationService.getOrg(this.item.parentId)
            .subscribe(item => {
                this.parentItem = item
            });
    }

    submit() {

        if (this.item.name == null || this.item.name.trim().length < 1) {
            this.messageService.add({ severity: 'warn', detail: "单位名不能为空" });
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
        this.organizationService.addOrg(this.item).subscribe(iRet => {
            this.buttonFlag = true;
            if (iRet > 0) {
                this.operateResult.emit(iRet);
            } else if (iRet == 0) {
                this.messageService.add({ severity: 'info', detail: this.item.name + " 单位信息添加失败，请重试" });
            } else {
                this.messageService.add({ severity: 'error', detail: "服务器内部出现错误，请稍后再试" });
            }
        })
    }

    goBack(): void {
        this.operateResult.emit(0);
    }

}
