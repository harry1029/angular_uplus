import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { PrimeNGConfig } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';

import { ProductInfo } from '../../../models/uplus/product-info';
import { ProductInfoService } from '../../../services/uplus/product-info.service';

import { CodeConversionService } from '../../../services/system/code-conversion.service';
import { CodeValue } from '../../../models/system/code-value';


@Component({
  selector: 'app-product-insert',
  templateUrl: './product-insert.component.html',
  styleUrls: ['./product-insert.component.css'],
  providers: [ProductInfoService, MessageService, CodeConversionService],
})
export class ProductInsertComponent implements OnInit {

  product: ProductInfo;

  msgs: Message[];

  // uploadedFiles: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productInfoService: ProductInfoService,
    private location: Location,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private codeConversionService: CodeConversionService,
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.product = {
      id: 0, code: "", name: "", originalName: ""
    };
  }

  addMessages(): void {
    this.msgs = [

    ];
  }

  submit() {

    // if (this.api.apiPath == null || this.api.apiPath.trim().length < 1) {
    //   this.messageService.add({ severity: 'warn', detail: "apiPath is mandatory." });
    //   return;
    // }
    this.productInfoService.addProductInfo(this.product).subscribe(iRet => {
      if (iRet > 0) {
        console.log(this.product);
        this.router.navigate(['/manage/products']);
      } else if (iRet == 0) {
        this.messageService.add({ severity: 'info', detail: "Save failed." });
      } else if (iRet < 0) {
        if (iRet === -10) {
          this.messageService.add({severity: 'error', summary:'Error', detail: 'Product code is required'})
        } else if (iRet === -12) {
          this.messageService.add({severity: 'error', summary:'Error', detail: 'Product name is required'})
        } else if (iRet === -11) {
          this.messageService.add({severity: 'error', summary:'Error', detail: 'Product code already exists'})
        }
      } else {
        this.messageService.add({ severity: 'error', detail: "An error occurred in the server" });
        console.log(this.product);
      }
    })
  }


  goBack(): void {
    this.location.back();
  }

}
