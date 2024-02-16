import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-neregistrovani',
  templateUrl: './header-neregistrovani.component.html',
  styleUrls: ['./header-neregistrovani.component.css']
})
export class HeaderNeregistrovaniComponent {

  constructor(private router: Router) {}

  login() {
    localStorage.clear();
    this.router.navigate(["login"]);
  }

  lozinka() {
    localStorage.clear();
    this.router.navigate(["promenaLozinkeNeZnam1"])
  }

  regNastavnik() {
    localStorage.clear();
    this.router.navigate(["registracijaNastavnici"]);
  }

  regUcenik() {
    localStorage.clear();
    this.router.navigate(["registracijaUcenici"]);
  }

}
