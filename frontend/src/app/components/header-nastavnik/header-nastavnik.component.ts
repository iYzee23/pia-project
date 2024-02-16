import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-nastavnik',
  templateUrl: './header-nastavnik.component.html',
  styleUrls: ['./header-nastavnik.component.css']
})
export class HeaderNastavnikComponent {

  constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigate(["neregistrovani"]);
  }

  promenaLozinke() {
    this.router.navigate(["promenaLozinkeZnam"])
  }

}
