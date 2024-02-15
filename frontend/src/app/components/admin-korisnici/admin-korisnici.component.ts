import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Korisnik } from 'src/app/models/korisnik';
import { ZService } from 'src/app/services/z.service';

@Component({
  selector: 'app-admin-korisnici',
  templateUrl: './admin-korisnici.component.html',
  styleUrls: ['./admin-korisnici.component.css']
})
export class AdminKorisniciComponent implements OnInit {

  kor_ime: string = "";
  sistem_nastavnici: Korisnik[] = [];
  obrada_nastavnici: Korisnik[] = [];
  ucenici: Korisnik[] = [];

  constructor(
    private service: ZService, private router: Router,
    private aRoute: ActivatedRoute, private location: Location
  ) {}

  ngOnInit(): void {
    this.kor_ime = localStorage.getItem("ulogovani")!
    this.service.dohvSveUcenike().subscribe(
      data1 => {
        this.ucenici = data1;
        for (let ucen of this.ucenici) {
          this.service.dohvUcenika(ucen.kor_ime).subscribe(
            data4 => {
              ucen.tr_razred = data4.tr_razred;
              ucen.tip_skole = data4.tip_skole;
            }
          );
        }
        this.service.dohvSveNastavnike().subscribe(
          data2 => {
            this.sistem_nastavnici = data2.filter(item => item.zahtev_status !== "U obradi");
            this.obrada_nastavnici = data2.filter(item => item.zahtev_status === "U obradi");
            for (let sNast of this.sistem_nastavnici) {
              this.service.dohvNastavnika(sNast.kor_ime).subscribe(
                data3 => {
                  sNast.cv_pdf = data3.cv_pdf;
                }
              );
            }
            for (let oNast of this.obrada_nastavnici) {
              this.service.dohvNastavnika(oNast.kor_ime).subscribe(
                data3 => {
                  oNast.cv_pdf = data3.cv_pdf;
                }
              );
            }
          }
        );
      }
    );
  }

  prihvati(nast: Korisnik) {
    this.service.prihvatiNastavnika(nast.kor_ime).subscribe(
      data => {
        this.ngOnInit();
      }
    );
  }

  odbij(nast: Korisnik) {
    this.service.odbijNastavnika(nast.kor_ime).subscribe(
      data => {
        this.ngOnInit();
      }
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["neregistrovani"]);
  }

  back() {
    this.location.back();
  }

}
