import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZService } from 'src/app/services/z.service';

@Component({
  selector: 'app-ucenik-prva',
  templateUrl: './ucenik-prva.component.html',
  styleUrls: ['./ucenik-prva.component.css']
})
export class UcenikPrvaComponent implements OnInit {

  ucenik: string = "";
  nastavnik: string = "";
  izabr_predmet: string = "";
  datum_vreme_start: string = "";
  dupli_cas: boolean = false;
  trajanje: number = 30;
  kratak_opis: string = "";
  poruka: string = "";
  predmeti: string[] = [];

  constructor(private service: ZService, private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.ucenik = localStorage.getItem("ulogovani")!;
    this.nastavnik = localStorage.getItem("nastavnik")!;
    this.service.dohvNastavnika(this.nastavnik).subscribe(
      data => {
        this.predmeti = data.predmeti;
        this.service.dohvPredmete().subscribe(
          tData => {
            const naziviPredm = tData.map(item => item.naziv);
            this.predmeti = this.predmeti.filter(item => naziviPredm.includes(item));
            if (this.predmeti.length === 1)
              this.izabr_predmet = this.predmeti[0];
          }
        );
      }
    );
  }

  zakaziCas() {
    if (this.izabr_predmet === "") this.poruka = "Morate izabrati predmet.";
    else if (this.datum_vreme_start === "") this.poruka = "Morate izabrati datum i vreme.";
    else if (this.kratak_opis === "") this.poruka = "Morate uneti kratak opis casa.";
    else {
      this.service.zakaziCas(this.ucenik, this.nastavnik, this.izabr_predmet, this.datum_vreme_start, this.kratak_opis, this.dupli_cas, this.trajanje).subscribe(
        data => {
          if (data.msg !== "OK") this.poruka = data.msg;
          else this.poruka = "Uspesno ste zakazali cas!";
        }
      );
    }
  }

  back() {
    this.location.back();
  }

}
