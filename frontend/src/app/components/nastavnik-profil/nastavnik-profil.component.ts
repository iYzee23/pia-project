import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZService } from 'src/app/services/z.service';

@Component({
  selector: 'app-nastavnik-profil',
  templateUrl: './nastavnik-profil.component.html',
  styleUrls: ['./nastavnik-profil.component.css']
})
export class NastavnikProfilComponent implements OnInit {

  kor_ime: string = "";
  ime: string = "";
  prezime: string = "";
  adresa: string = "";
  email: string = "";
  telefon: string = "";
  prof_slika: string = "";
  predmeti: string[] = [];
  uzrasti: string[] = [];
  poruka: string = "";
  mejlPoruka: string = "";

  slob_predmeti: string = "";
  def_predmeti: {
    naziv: string;
    izabr: boolean;
  }[] = [];
  def_uzrasti = [
    {naziv: "Osnovna skola [1-4]", izabr: false},
    {naziv: "Osnovna skola [5-8]", izabr: false},
    {naziv: "Srednja skola", izabr: false},
  ];

  azur_ime: string = "";
  azur_prezime: string = "";
  azur_adresa: string = "";
  azur_email: string = "";
  azur_telefon: string = "";
  azur_prof_slika: string = "";

  constructor(private service: ZService, private router: Router) {}

  ngOnInit(): void {
    this.def_predmeti = [];
    this.kor_ime = localStorage.getItem("ulogovani")!;
    this.service.dohvKorisnika(this.kor_ime).subscribe(
      data => {
        this.ime = data.ime;
        this.prezime = data.prezime;
        this.adresa = data.adresa;
        this.email = data.email;
        this.telefon = data.telefon;
        this.prof_slika = data.prof_slika;
        this.service.dohvNastavnika(this.kor_ime).subscribe(
          data1 => {
            this.predmeti = data1.predmeti;
            this.uzrasti = data1.uzrast;
            this.service.dohvPredmete().subscribe(
              data2 => {
                for (let pr of data2) {
                  const naziv = pr.naziv;
                  const izabr = this.predmeti.includes(naziv);
                  this.def_predmeti.push({
                    naziv: naziv,
                    izabr: izabr
                  });
                }
                this.predmeti = this.def_predmeti.filter(item => item.izabr).map(item => item.naziv);
                for (let uzr of this.def_uzrasti)
                  uzr.izabr = this.uzrasti.includes(uzr.naziv);
                  this.clearAzur();
              }
            );
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
    this.slob_predmeti = "";
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

  azurirajPredmete() {
    let izabrPredmeti = this.def_predmeti.filter(item => item.izabr).map(item => item.naziv);
    const slobPredmeti = this.slob_predmeti.length === 0 ? [] : this.slob_predmeti.split(", ");
    if (slobPredmeti.length > 0) izabrPredmeti.push(...slobPredmeti);
    this.service.azurirajPredmete(this.kor_ime, izabrPredmeti).subscribe(
      data => {
        if (slobPredmeti.length > 0) {
          this.service.predloziPredmete(slobPredmeti).subscribe(
            tData => {
              this.ngOnInit();
            }
          );
        }
        else {
          this.ngOnInit();
        }
      }
    );
  }

  azurirajUzraste() {
    const izabrUzrasti = this.def_uzrasti.filter(item => item.izabr).map(item => item.naziv);
    this.service.azurirajUzraste(this.kor_ime, izabrUzrasti).subscribe(
      data => {
        this.ngOnInit();
      }
    );
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

  proveriPredmete() {
    return this.def_predmeti.filter(item => item.izabr).length === 0 && this.slob_predmeti === "";
  }

  proveriUzraste() {
    return this.def_uzrasti.filter(item => item.izabr).length === 0;
  }

  proveriSliku() {
    return this.poruka !== "";
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["neregistrovani"]);
  }

}
