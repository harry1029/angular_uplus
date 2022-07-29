import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { ProductInfo } from '../../../models/uplus/product-info';
import { ProductInfoService } from '../../../services/uplus/product-info.service';

import { CodeValue } from '../../../models/system/code-value';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  providers: [MessageService, ProductInfoService],
})
export class ProductEditComponent implements OnInit {

  productId: number;
  product: ProductInfo;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productInfoService: ProductInfoService,
    private location: Location,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId <= 0) {
      this.messageService.add({ severity: 'warn', detail: "Wrong Teacher Id!" });
      this.goBack()
    }
    this.productInfoService.getProductInfo(this.productId).subscribe(h => {
      if (h.id <= 0) {
        this.messageService.add({ severity: 'warn', detail: "Wrong Teacher Id!" });
        this.goBack()
      }
      this.product = h;
      console.log(this.product);
    })

    this.product = {
      id: 0, code: "", name: "", originalName: ""
    };
  }

  submit() {

    // if (this.api.apiPath == null || this.api.apiPath.trim().length < 1) {
    //   this.messageService.add({ severity: 'warn', detail: "apiPath is mandatory." });
    //   return;
    // }
    this.productInfoService.updateProductInfo(this.product).subscribe(iRet => {
      if (iRet > 0) {
        console.log(this.product);
        this.router.navigate(['/manage/products']);
      } else if (iRet == 0) {
        this.messageService.add({ severity: 'info', detail: "Save failed." });
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
