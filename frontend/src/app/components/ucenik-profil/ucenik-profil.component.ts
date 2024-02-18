import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZService } from 'src/app/services/z.service';

@Component({
  selector: 'app-ucenik-profil',
  templateUrl: './ucenik-profil.component.html',
  styleUrls: ['./ucenik-profil.component.css']
})
export class UcenikProfilComponent implements OnInit {

  kor_ime: string = "";
  ime: string = "";
  prezime: string = "";
  adresa: string = "";
  email: string = "";
  telefon: string = "";
  prof_slika: string = "";
  tip_skole: string = "";
  tr_razred: number = 0;
  poruka: string = "";
  mejlPoruka: string = "";

  azur_ime: string = "";
  azur_prezime: string = "";
  azur_adresa: string = "";
  azur_email: string = "";
  azur_telefon: string = "";
  azur_prof_slika: string = "";
  azur_tip_skole: string = "";

  constructor(private service: ZService, private router: Router) {}

  ngOnInit(): void {
    this.kor_ime = localStorage.getItem("ulogovani")!;
    this.service.dohvKorisnika(this.kor_ime).subscribe(
      data => {
        this.ime = data.ime;
        this.prezime = data.prezime;
        this.adresa = data.adresa;
        this.email = data.email;
        this.telefon = data.telefon;
        this.prof_slika = data.prof_slika;
        this.service.dohvUcenika(this.kor_ime).subscribe(
          data1 => {
            this.tip_skole = data1.tip_skole;
            this.tr_razred = data1.tr_razred;
            this.clearAzur();
          }
        );
      }
    );
  }

  handleSlika(azur_prof_slika: string) {
    this.azur_prof_slika = azur_prof_slika;
  }

  handleGreska(greska: string) {
    this.poruka = greska;
  }

  clearAzur() {
    this.azur_ime = "";
    this.azur_prezime = "";
    this.azur_adresa = "";
    this.azur_email = "";
    this.azur_telefon = "";
    this.azur_tip_skole = "";
  }

  azurirajProfilnuSliku() {
    this.service.azurirajProfSliku(this.kor_ime, this.azur_prof_slika).subscribe(
      data => {
        this.ngOnInit();
      }
    );
  }

  azurirajIme() {
    this.service.azurirajIme(this.kor_ime, this.azur_ime).subscribe(
      data => {
        this.ngOnInit();
      }
    );
  }

  azurirajPrezime() {
    this.service.azurirajPrezime(this.kor_ime, this.azur_prezime).subscribe(
      data => {
        this.ngOnInit();
      }
    );
  }

  azurirajAdresu() {
    this.service.azurirajAdresu(this.kor_ime, this.azur_adresa).subscribe(
      data => {
        this.ngOnInit();
      }
    );
  }

  azurirajEmail() {
    this.service.proveriJedinstvenMejl(this.azur_email).subscribe(
      tData => {
        if (tData) this.mejlPoruka = "Niste uneli jedinstveni mejl.";
        else {
          this.mejlPoruka = "";
          this.service.azurirajEmail(this.kor_ime, this.azur_email).subscribe(
            data => {
              this.ngOnInit();
            }
          );
        }
      }
    );
  }

  azurirajTelefon() {
    this.service.azurirajTelefon(this.kor_ime, this.azur_telefon).subscribe(
      data => {
        this.ngOnInit();
      }
    );
  }

  azurirajTrRazred() {
    this.service.azurirajTrRazred(this.kor_ime, this.azur_tip_skole).subscribe(
      data => {
        this.ngOnInit();
      }
    );
  }

  proveriAzurTrRazred() {
    const expr1 = this.tip_skole.includes("Srednja") && this.tr_razred === 4;
    const expr2 = this.tip_skole.includes("Osnovna") && this.tr_razred === 8 && this.azur_tip_skole === "";
    return expr1 || expr2;
  }

  proveriAzurTipSkole() {
    const expr1 = this.tip_skole.includes("Srednja");
    const expr2 = this.tip_skole.includes("Osnovna") && this.tr_razred !== 8;
    return expr1 || expr2;
  }

  proveriEmail() {
    const regexEmail = /^[a-zA-Z_][\w.-]*@[a-zA-Z\d-]+\.[a-zA-Z\d-.]+$/;
    const expr1 = this.azur_email === "";
    const expr2 = !regexEmail.test(this.azur_email);
    return expr1 || expr2;
  }

  proveriTelefon() {
    const regexTelefon = /^06\d{7,8}$/;
    const expr1 = this.azur_telefon === "";
    const expr2 = !regexTelefon.test(this.azur_telefon);
    return expr1 || expr2;
  }

  proveriSliku() {
    return this.poruka !== "";
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["neregistrovani"]);
  }

}
