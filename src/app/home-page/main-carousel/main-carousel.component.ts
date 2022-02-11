import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Picture } from '../../models/picture';
import { CarouselPictureService } from '../../services/carousel-picture.service';

@Component({
  selector: 'app-main-carousel',
  templateUrl: './main-carousel.component.html',
  styleUrls: ['./main-carousel.component.css'],
  providers: [CarouselPictureService],
})
export class MainCarouselComponent implements OnInit {

  @Input() homeType: string;
  pictures: Picture[];
  responsiveOptions;

  constructor(
    private router: Router,
    private carouselPictureService: CarouselPictureService) {
    this.responsiveOptions = [
      {
        breakpoint: '1800px',
        numVisible: 4,
        numScroll: 2
      },
      {
        breakpoint: '1500px',
        numVisible: 3,
        numScroll: 2
      },
      {
        breakpoint: '1000px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '800px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit(): void {
    if (this.homeType == "main") {
      this.getMainPictures();
    } else {
      this.getTourPictures();
    }
  }

  getMainPictures(): void {
    this.carouselPictureService.getMainCarouselPictures()
      .subscribe(pictures => this.pictures = pictures);
  }

  getTourPictures(): void {
    this.carouselPictureService.getTourCarouselPictures()
      .subscribe(pictures => this.pictures = pictures);
  }
}
