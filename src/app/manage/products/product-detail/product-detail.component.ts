import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { ProductInfo } from 'src/app/models/uplus/product-info';
import { ProductInfoService } from 'src/app/services/uplus/product-info.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [MessageService, ProductInfoService],
})
export class ProductDetailComponent implements OnInit {

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
      this.messageService.add({ severity: 'warn', detail: "Wrong Product Id!" });
      this.goBack()
    }

    this.productInfoService.getProductInfo(this.productId).subscribe(h => {
      if (h.id <= 0) {
        this.messageService.add({ severity: 'warn', detail: "Wrong Product Id!" });
        this.goBack()
      }
      this.product = h;
      // this.codeConversionService.getCodeValue(100010, this.api.apiMethod)
      //   .subscribe(codeValueDescription => {
      //     this.codeValueDescription = codeValueDescription;
      //   });

      console.log(this.product);
      // this.test();
    })
  };

  goBack(): void {
    this.location.back();
  };

}
