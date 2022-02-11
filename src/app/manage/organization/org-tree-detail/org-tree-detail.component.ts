import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

import { OrganizationService } from '../../../services/system/organization.service';
import { OrgTree } from '../../../models/system/org-tree';

@Component({
    selector: 'app-org-tree-detail',
    templateUrl: './org-tree-detail.component.html',
    styleUrls: ['./org-tree-detail.component.css'],
    providers: [MessageService, OrganizationService]
})
export class OrgTreeDetailComponent implements OnInit {

    @Output() private operateResult = new EventEmitter();
    @Input() orgId: number;
    item: OrgTree;
    parentItem: OrgTree

    constructor(
        private primengConfig: PrimeNGConfig,
        private messageService: MessageService,
        private organizationService: OrganizationService,
    ) { }

    ngOnInit(): void {
        this.primengConfig.ripple = true;

    }

    ngOnChanges(changes: SimpleChanges): void {
        this.parentItem = null;
        this.getItem();
    }

    //获取树节点
    private getItem() {
        this.organizationService.getOrg(this.orgId)
            .subscribe(item => {
                this.item = item
                this.getParent()
            });
    }

    //获取父节点
    private getParent() {
        this.organizationService.getOrg(this.item.parentId)
            .subscribe(item => {
                this.parentItem = item
            });
    }

    update(): void {
        this.operateResult.emit(2);
    }
    delete(): void {
        this.messageService.clear();
        this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: '删除该单位信息' });
    }

    onConfirm() {
        this.deleteOrg(this.item);
        this.messageService.clear('c');
    }

    deleteOrg(org: OrgTree): void {
        this.organizationService.deleteOrg(org.id).subscribe(
            iRet => {
                if (iRet > 0) {
                    this.messageService.add({ severity: 'success', detail: "该单位结点删除成功" });
                    this.operateResult.emit(4);
                } else if (iRet == -2) {
                    this.messageService.add({ severity: 'warn', detail: "非叶子结点，不能删除" });
                } else {
                    this.messageService.add({ severity: 'error', detail: "该单位结点删除失败" });
                }
            });
    }

    onReject() {
        this.messageService.clear('c');
    }

    add(): void {
        this.operateResult.emit(3);
    }

    goBack(): void {
        this.operateResult.emit(0);
    }

}
