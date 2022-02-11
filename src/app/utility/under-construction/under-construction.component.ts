import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-under-construction',
  templateUrl: './under-construction.component.html',
  styleUrls: ['./under-construction.component.css']
})
export class UnderConstructionComponent implements OnInit {

  constructor(private router: Router, private location: Location,) { }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }
  gohome() {
    this.router.navigate(['/']);
  }

}
