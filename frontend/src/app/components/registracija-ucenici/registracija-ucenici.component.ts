import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ZService } from 'src/app/services/z.service';

@Component({
  selector: 'app-registracija-ucenici',
  templateUrl: './registracija-ucenici.component.html',
  styleUrls: ['./registracija-ucenici.component.css']
})
export class RegistracijaUceniciComponent {

  kor_ime: string = "";
  lozinka: string = "";
  bezb_pitanje: string = "";
  bezb_odgovor: string = "";
  ime: string = "";
  prezime: string = "";
  pol: string = "M";
  adresa: string = "";
  telefon: string = "";
  email: string = "";
  prof_slika: string = "";
  tip_skole: string = "Osnovna";
  tr_razred: number = 1;
  poruka: string = "";

  skole: string[] = ["Osnovna", "Srednja [gimnazija]", "Srednja [strucna]", "Srednja [umetnicka]"];
  razr_osnovna: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  razr_srednja: number[] = [1, 2, 3, 4];
  razr_izabrani: number[] = this.razr_osnovna;

  constructor(private service: ZService, private router: Router) {}

  registracija() {
    if (this.kor_ime === "") this.poruka = "Morate uneti korisnicko ime.";
    else if (this.lozinka === "") this.poruka = "Morate uneti lozinku.";
    else if (this.bezb_pitanje === "") this.poruka = "Morate uneti bezbednosno pitanje.";
    else if (this.bezb_odgovor === "") this.poruka = "Morate uneti bezbednosni odgovor.";
    else if (this.ime === "") this.poruka = "Morate uneti ime.";
    else if (this.prezime === "") this.poruka = "Morate uneti prezime.";
    else if (this.adresa === "") this.poruka = "Morate uneti adresu.";
    else if (this.telefon === "") this.poruka = "Morate uneti kontakt telefon.";
    else if (this.email === "") this.poruka = "Morate uneti mejl.";
    else {
      const regexEmail = /^[a-zA-Z_][\w.-]*@[a-zA-Z\d-]+\.[a-zA-Z\d-.]+$/;
      const regexLozinka = /^(?=[a-zA-Z])(?=.*[A-Z])(?=(?:[^a-z]*[a-z]){3})(?=.*[!@#$%^&*])\S{6,10}$/;
      const regexTelefon = /^06\d{7,8}$/;
      if (!regexEmail.test(this.email)) this.poruka = "Niste uneli mejl adresu u dobrom formatu.";
      else if (!regexLozinka.test(this.lozinka)) this.poruka = "Niste uneli lozinku u dobrom formatu.";
      else if (!regexTelefon.test(this.telefon)) this.poruka = "Niste uneli kontakt telefon u dobrom formatu.";
      else {
        this.service.registracijaUcenik(
          this.kor_ime, this.email, this.lozinka, this.bezb_pitanje, this.bezb_odgovor, this.ime,
          this.prezime, this.pol, this.adresa, this.telefon, this.prof_slika, this.tip_skole, this.tr_razred
        ).subscribe(
          data => {
            if (data.msg !== "OK") this.poruka = data.msg;
            else {
              this.poruka = "";
              localStorage.clear();
              this.router.navigate(["login"]);
            }
          }
        );
      }
    }
  }

  handleGreska(greska: string) {
    this.poruka = greska;
  }

  handleSlika(url: string) {
    this.prof_slika = url;
  }

  handlePromenaTipaSkole() {
    if (this.tip_skole === "Osnovna") this.razr_izabrani = this.razr_osnovna;
    else this.razr_izabrani = this.razr_srednja;
    this.tr_razred = 1;
  }

  pocetna() {
    localStorage.clear();
    this.router.navigate(["neregistrovani"]);
  }

}
