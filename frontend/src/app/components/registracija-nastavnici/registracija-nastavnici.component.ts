import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZService } from 'src/app/services/z.service';

@Component({
  selector: 'app-registracija-nastavnici',
  templateUrl: './registracija-nastavnici.component.html',
  styleUrls: ['./registracija-nastavnici.component.css']
})
export class RegistracijaNastavniciComponent implements OnInit {

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
  cv_pdf: string = "";
  slob_predmeti: string = "";
  culi_sajt: string = "";
  poruka: string = "";

  predmeti: {
    naziv: string, izabr: boolean
  }[] = [];
  uzrasti = [
    {naziv: "Osnovna skola [1-4]", izabr: false},
    {naziv: "Osnovna skola [5-8]", izabr: false},
    {naziv: "Srednja skola", izabr: false},
  ];

  constructor(private service: ZService, private router: Router) {}

  ngOnInit(): void {
    this.service.dohvPredmete().subscribe(
      data => {
        for (let pr of data) {
          this.predmeti.push({
            naziv: pr.naziv,
            izabr: false
          });
        }
      }
    );
  }

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
    else if (this.cv_pdf === "") this.poruka = "Morate uneti radnu biografiju kroz PDF fajl.";
    else if (this.predmeti.filter(item => item.izabr).length === 0 && this.slob_predmeti === "")
      this.poruka = "Morate uneti barem jedan predmet koji zelite da predajete.";
    else if (this.uzrasti.filter(item => item.izabr).length === 0)
      this.poruka = "Morate izabrati barem jedan uzrast kome zelite da predajete.";
    else if (this.culi_sajt === "") this.poruka = "Morate uneti odgovor na pitanje gde ste culi za nas sajt.";
    else {
      const regexEmail = /^[a-zA-Z_][\w.-]*@[a-zA-Z\d-]+\.[a-zA-Z\d-.]+$/;
      const regexLozinka = /^(?=[a-zA-Z])(?=.*[A-Z])(?=(?:[^a-z]*[a-z]){3})(?=.*[!@#$%^&*])\S{6,10}$/;
      const regexTelefon = /^06\d{7,8}$/;
      if (!regexEmail.test(this.email)) this.poruka = "Niste uneli mejl adresu u dobrom formatu.";
      else if (!regexLozinka.test(this.lozinka)) this.poruka = "Niste uneli lozinku u dobrom formatu.";
      else if (!regexTelefon.test(this.telefon)) this.poruka = "Niste uneli kontakt telefon u dobrom formatu.";
      else {
        const izabrUzrasti = this.uzrasti.filter(item => item.izabr).map(item => item.naziv);
        let izabrPredmeti = this.predmeti.filter(item => item.izabr).map(item => item.naziv);
        const slobPredmeti = this.slob_predmeti.length === 0 ? [] : this.slob_predmeti.split(", ");
        if (slobPredmeti.length > 0) izabrPredmeti.push(...slobPredmeti);

        this.service.registracijaNastavnik(
          this.kor_ime, this.email, this.lozinka, this.bezb_pitanje, this.bezb_odgovor, this.ime, this.prezime, this.pol,
          this.adresa, this.telefon, this.prof_slika, this.cv_pdf, izabrPredmeti, izabrUzrasti, this.culi_sajt
        ).subscribe(
          data => {
            if (data.msg !== "OK") this.poruka = data.msg;
            else {
              if (slobPredmeti.length > 0) {
                this.service.predloziPredmete(slobPredmeti).subscribe(
                  tData => {
                    this.poruka = "";
                    localStorage.clear();
                    this.router.navigate(["login"]);
                  }
                );
              }
              else {
                this.poruka = "";
                localStorage.clear();
                this.router.navigate(["login"]);
              }
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

  handlePdf(url: string) {
    this.cv_pdf = url;
  }

  pocetna() {
    localStorage.clear();
    this.router.navigate(["neregistrovani"]);
  }
}
