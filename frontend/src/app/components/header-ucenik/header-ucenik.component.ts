import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-ucenik',
  templateUrl: './header-ucenik.component.html',
  styleUrls: ['./header-ucenik.component.css']
})
export class HeaderUcenikComponent {

  constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigate(["neregistrovani"]);
  }

  promenaLozinke() {
    this.router.navigate(["promenaLozinkeZnam"])
  }

}
