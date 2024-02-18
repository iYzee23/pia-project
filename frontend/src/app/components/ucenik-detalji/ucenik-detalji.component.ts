import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ZService } from 'src/app/services/z.service';

@Component({
  selector: 'app-ucenik-detalji',
  templateUrl: './ucenik-detalji.component.html',
  styleUrls: ['./ucenik-detalji.component.css']
})
export class UcenikDetaljiComponent implements OnInit {

  kor_ime: string = "";
  ime: string = "";
  prezime: string = "";
  prof_slika: string = "";
  email: string = "";
  telefon: string = "";
  predmeti: string[] = [];
  niz: {ucenik: string, ocena: number, komentar: string}[] = [];

  constructor(
    private service: ZService, private router: Router,
    private aRoute: ActivatedRoute, private location: Location
  ) {}

  ngOnInit(): void {
    this.aRoute.queryParams.subscribe(
      params => {
        this.kor_ime = params["nastavnik"];
        this.service.dohvKorisnika(this.kor_ime).subscribe(
          data1 => {
            this.ime = data1.ime;
            this.prezime = data1.prezime;
            this.prof_slika = data1.prof_slika;
            this.email = data1.email;
            this.telefon = data1.telefon;
            this.service.dohvNastavnika(this.kor_ime).subscribe(
              data2 => {
                this.predmeti = data2.predmeti;
                this.service.dohvCasoveNastavnika(this.kor_ime).subscribe(
                  data3 => {
                    for (let cas of data3) {
                      if (cas.ocena_ucenik && cas.komentar_ucenik) {
                        this.niz.push({
                          ucenik: cas.ucenik,
                          ocena: cas.ocena_ucenik,
                          komentar: cas.komentar_ucenik
                        });
                      }
                    }
                    this.service.dohvPredmete().subscribe(
                      data4 => {
                        const naziviPredm = data4.map(item => item.naziv);
                        this.predmeti = this.predmeti.filter(item => naziviPredm.includes(item));
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    );
  }

  back() {
    this.location.back();
  }

  zakaziPrvi() {
    localStorage.setItem("nastavnik", this.kor_ime);
    this.router.navigate(["ucenikPrva"]);
  }

  zakaziDrugi() {
    localStorage.setItem("nastavnik", this.kor_ime);
    this.router.navigate(["ucenikDruga"]);
  }

}
