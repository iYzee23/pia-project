import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cas } from 'src/app/models/cas';
import { ZService } from 'src/app/services/z.service';

@Component({
  selector: 'app-nastavnik-dosije',
  templateUrl: './nastavnik-dosije.component.html',
  styleUrls: ['./nastavnik-dosije.component.css']
})
export class NastavnikDosijeComponent implements OnInit {

  nastavnik: string = "";
  ucenik: string = "";
  casovi: Cas[] = [];

  constructor(
    private service: ZService, private router: Router,
    private aRoute: ActivatedRoute, private location: Location
  ) {}

  ngOnInit(): void {
    this.nastavnik = localStorage.getItem("ulogovani")!;
    this.aRoute.queryParams.subscribe(
      params => {
        this.ucenik = params["ucenik"];
        this.service.dohvCasoveUcenikNastavnik(this.ucenik, this.nastavnik).subscribe(
          data => {
            this.casovi = data;
            this.sortCasove();
          }
        );
      }
    );
  }

  handleRatingSelected(rating: number, cas: Cas) {
    cas.uOcenaNastavnik = rating;
  }

  formatirajDatumVreme(datum_vreme: string): string {
    const [datum, vreme] = datum_vreme.split("T");
    return datum + ", " + vreme.slice(0, -1);
  }

  sortCasove() {
    this.casovi.sort((a, b) => {
      if (a.predmet < b.predmet) return -1;
      if (a.predmet > b.predmet) return 1;
      return 0;
    });
  }

  back() {
    this.location.back();
  }

  proveri(cas: Cas) {
    return cas.uOcenaNastavnik === null || cas.uOcenaNastavnik === undefined
      || cas.uKomentarNastavnik === null || cas.uKomentarNastavnik === undefined || cas.uKomentarNastavnik === "";
  }

  unesi(cas: Cas) {
    console.log(cas.uOcenaNastavnik);
    console.log(cas.uKomentarNastavnik);
    this.service.unesiKomentarIOcenuNastavnik(cas._id, cas.uKomentarNastavnik, cas.uOcenaNastavnik).subscribe(
      data => {
        this.ngOnInit();
      }
    );
  }

}
