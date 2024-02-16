import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header-no-basic',
  templateUrl: './header-no-basic.component.html',
  styleUrls: ['./header-no-basic.component.css']
})
export class HeaderNoBasicComponent implements OnInit {

  curr_path: string = "";

  constructor(private router: Router, private location: Location, private aRouter: ActivatedRoute) {}

  ngOnInit(): void {
    this.aRouter.url.subscribe(segm => {
      this.curr_path = segm.join("/");
    });
  }

  back() {
    this.location.back();
  }

}
