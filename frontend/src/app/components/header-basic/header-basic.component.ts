import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header-basic',
  templateUrl: './header-basic.component.html',
  styleUrls: ['./header-basic.component.css']
})
export class HeaderBasicComponent implements OnInit {

  curr_path: string = "";

  constructor(private router: Router, private aRouter: ActivatedRoute) {}

  ngOnInit(): void {
    this.aRouter.url.subscribe(segm => {
      this.curr_path = segm.join("/");
    });
  }

  pocetna() {
    localStorage.clear();
    this.router.navigate(["neregistrovani"]);
  }

}
