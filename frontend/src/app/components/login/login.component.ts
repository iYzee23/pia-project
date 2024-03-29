import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ZService } from 'src/app/services/z.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  kor_ime: string = "";
  lozinka: string = "";
  tip: string = "Ucenik";
  poruka: string = "";

  constructor(private service: ZService, private router: Router) {}

  login() {
    if (this.kor_ime === "") this.poruka = "Morate uneti korisnicko ime.";
    else if (this.lozinka === "") this.poruka = "Morate uneti lozinku.";
    else {
      this.service.login(this.kor_ime, this.lozinka, this.tip).subscribe(
        data => {
          if (!data) this.poruka = "Losi podaci. Pokusajte ponovo!";
          else {
            this.poruka = "";
            localStorage.setItem("ulogovani", this.kor_ime);
            localStorage.setItem("tip", data.tip);
            if (this.tip === "Ucenik") this.router.navigate(["ucenikProfil"]);
            else this.router.navigate(["nastavnikProfil"]);
          }
        }
      );
    }
  }

  pocetna() {
    localStorage.clear();
    this.router.navigate(["neregistrovani"]);
  }

}
