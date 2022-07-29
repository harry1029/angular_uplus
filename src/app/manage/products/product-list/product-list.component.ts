import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

import { environment } from '../../../../environments/environment';

import { ProductInfo } from 'src/app/models/uplus/product-info';
import { ProductInfoService } from 'src/app/services/uplus/product-info.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductInfoService, MessageService]
})
export class ProductListComponent implements OnInit {

  apiUrl: string = environment.apiServerUrl + "/h";
  products: ProductInfo[];

  selected: ProductInfo;

  constructor(
    private productInfoService: ProductInfoService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private messageService: MessageService,

  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.getProducts();
  }

  getProducts(): void {
    this.productInfoService.getActivatedProductInfos()
      .subscribe(products => {
        this.products = products;
        console.log("products: ", products);
      });
  }

  deleteProduct(product: ProductInfo): void {
    this.productInfoService.deleteProductInfo(product.id).subscribe(
      deleteN => {
        if (deleteN > 0) {
          let message = 'Teacher "' + this.selected.code + " " + this.selected.name + '" has been successfully deleted.'
          this.messageService.clear();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: message, life: 10000 });
          this.getProducts();
        } else {
          this.messageService.clear();
          this.messageService.add({ severity: 'info', summary: 'Info', detail: 'No product has been deleted.', life: 10000 });
        }
      });
  }

  deleteConfirm(product: ProductInfo) {
    this.selected = product;
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Delete Product' });
  }


  onConfirm() {
    this.deleteProduct(this.selected);
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }

  insert() {
    this.router.navigate([`/manage/productinsert`]);
  }

  edit(product: ProductInfo) {
    this.selected = product;
    this.router.navigate([`/manage/productedit/${product.id}`]);
  }

  detail(product: ProductInfo) {
    this.selected = product;
    this.router.navigate([`/manage/productdetail/${product.id}`]);
  }

  // attachment(product: ProductInfo) {
  //   this.selected = teacher;
  //   this.router.navigate([`/manage/teacherattach/${teacher.id}`]);
  // }

}
