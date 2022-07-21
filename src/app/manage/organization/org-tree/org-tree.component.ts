import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

import { OrganizationService } from '../../../services/system/organization.service';
import { TreeNode } from '../../../models/system/tree-node';
import { OrgTree } from '../../../models/system/org-tree';

@Component({
  selector: 'app-org-tree',
  templateUrl: './org-tree.component.html',
  styleUrls: ['./org-tree.component.css'],
  providers: [MessageService, OrganizationService]
})
export class OrgTreeComponent implements OnInit {
  items: OrgTree[]
  treeNodes: TreeNode[]   //保存tree
  selectedNode: TreeNode;
  operationFlag: number; //1-详细，2-更新，3-增加, 4-删除成功

  constructor(
    private organizationService: OrganizationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getOrgTree()
  }


  //从服务器获取树
  private getOrgTree() {
    this.organizationService.getOrgTree(1)
      .subscribe(orgTree => {
        this.items = orgTree.organizations;
        this.defined()
      })
  }

  //将menu的属性赋值到tree，方便用tree来显示JSON数据
  private exchange(org: OrgTree[]): TreeNode[] {
    let data: TreeNode[] = []
    for (let i = 0; i < org.length; i++) {
      let delFlag: string = ""
      if (org[i].deleteFlag > 0) {
        delFlag = "-X"
      }
      var node: TreeNode = {
        id: org[i].id,
        label: org[i].name + delFlag,
        children: null
      }
      data[i] = node;
      if (org[i].organizations != null) {
        node.children = this.exchange(org[i].organizations);
      }
    }
    return data;
  }

  private defined() {
    this.treeNodes = this.exchange(this.items)
  }

  expandAll() {
    this.treeNodes.forEach(node => {
      this.expandRecursive(node, true);
    });
  }

  collapseAll() {
    this.treeNodes.forEach(node => {
      this.expandRecursive(node, false);
    });
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }

  nodeSelect(event) {
    if (this.selectedNode == null || this.selectedNode.id == null || this.selectedNode.id < 0) {
      this.operationFlag = 0;
      return
    }
    this.operationFlag = 1;
  }

  goBack(): void {
    this.location.back();
  }

  fromChild(operateResult: number) {
    if (this.operationFlag == 1) {
      if (operateResult == 4) {
        this.messageService.add({ severity: 'success', detail: this.selectedNode.label + "单位信息删除成功" });
        this.selectedNode.label = "已删除 - " + this.selectedNode.label;
        this.selectedNode.id = -1;
        operateResult = 0;
      }
      this.operationFlag = operateResult;
      return;
    } else if (this.operationFlag == 2 && operateResult > 0) {
      this.organizationService.getOrg(operateResult).subscribe(s => {
        this.selectedNode.label = s.name;
        this.messageService.add({ severity: 'success', detail: this.selectedNode.label + " 单位信息更新成功" });
      })
    } else if (this.operationFlag == 3 && operateResult > 0) {
      this.organizationService.getOrg(operateResult).subscribe(s => {
        var node: TreeNode = {
          id: s.id,
          label: s.name,
          children: null
        }
        if (this.selectedNode.children == null) {
          this.selectedNode.children = [node]
        } else {
          this.selectedNode.children.push(node)
        }
        this.selectedNode = node;
        this.messageService.add({ severity: 'success', detail: this.selectedNode.label + " 单位信息添加成功" });
      })
    }
    this.operationFlag = 1;
  }
}
