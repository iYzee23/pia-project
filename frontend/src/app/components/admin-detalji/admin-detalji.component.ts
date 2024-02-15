import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Korisnik } from 'src/app/models/korisnik';
import { ZService } from 'src/app/services/z.service';

@Component({
  selector: 'app-admin-detalji',
  templateUrl: './admin-detalji.component.html',
  styleUrls: ['./admin-detalji.component.css']
})
export class AdminDetaljiComponent implements OnInit {

  kor_ime: string = "";
  nastavnik_kor_ime: string = "";
  nastavnik: Korisnik = new Korisnik();
  poruka: string = "";
  mejlPoruka: string = "";

  azur_ime: string = "";
  azur_prezime: string = "";
  azur_adresa: string = "";
  azur_email: string = "";
  azur_telefon: string = "";
  azur_prof_slika: string = "";
  azur_bezb_pitanje: string = "";
  azur_bezb_odgovor: string = "";

  constructor(
    private service: ZService, private router: Router,
    private aRoute: ActivatedRoute, private location: Location
  ) {}

  ngOnInit(): void {
    this.kor_ime = localStorage.getItem("ulogovani")!;
    this.aRoute.queryParams.subscribe(
      params => {
        this.nastavnik_kor_ime = params["nastavnik"];
        this.service.dohvKorisnika(this.nastavnik_kor_ime).subscribe(
          data1 => {
            this.nastavnik = data1;
            this.service.dohvNastavnika(this.nastavnik_kor_ime).subscribe(
              data2 => {
                this.nastavnik.predmeti = data2.predmeti;
                this.nastavnik.uzrast = data2.uzrast;
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
    this.azur_bezb_pitanje = "";
    this.azur_bezb_odgovor = "";
  }

  azurirajProfilnuSliku() {
    this.service.azurirajProfSliku(this.nastavnik_kor_ime, this.azur_prof_slika).subscribe(
      data => {
        this.ngOnInit();
      }
    );
  }

  azurirajIme() {
    this.service.azurirajIme(this.nastavnik_kor_ime, this.azur_ime).subscribe(
      data => {
        this.ngOnInit();
      }
    );
  }

  azurirajPrezime() {
    this.service.azurirajPrezime(this.nastavnik_kor_ime, this.azur_prezime).subscribe(
      data => {
        this.ngOnInit();
      }
    );
  }

  azurirajAdresu() {
    this.service.azurirajAdresu(this.nastavnik_kor_ime, this.azur_adresa).subscribe(
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
          this.service.azurirajEmail(this.nastavnik_kor_ime, this.azur_email).subscribe(
            data => {
              this.ngOnInit();
            }
          );
        }
      }
    );
  }

  azurirajTelefon() {
    this.service.azurirajTelefon(this.nastavnik_kor_ime, this.azur_telefon).subscribe(
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

  proveriSliku() {
    return this.poruka !== "";
  }

  proveriBezbPitanjeOdgovor() {
    return this.azur_bezb_pitanje === null || this.azur_bezb_pitanje === ""
      || this.azur_bezb_odgovor === null || this.azur_bezb_odgovor === ""
  }

  azurirajBezbPitanjeOdgovor() {
    this.service.azurirajBezbPitanjeOdgovor(this.nastavnik_kor_ime, this.azur_bezb_pitanje, this.azur_bezb_odgovor).subscribe(
      data => {
        this.ngOnInit();
      }
    );
  }

  back() {
    this.location.back();
  }

}
