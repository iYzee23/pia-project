import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Predmet } from 'src/app/models/predmet';
import { ZService } from 'src/app/services/z.service';

@Component({
  selector: 'app-neregistrovani',
  templateUrl: './neregistrovani.component.html',
  styleUrls: ['./neregistrovani.component.css']
})
export class NeregistrovaniComponent implements OnInit {

  ukupanBrUcenika: number = 0;
  ukupanBrPrihvacenihNastavnika: number = 0;
  brCasovaPrethNedelja: number = 0;
  brCasovaPrethMesec: number = 0;

  niz: {predmet: string, nIme: string, nPrezime: string}[] = [];
  fNiz: {predmet: string, nIme: string, nPrezime: string}[] = [];
  pretrIme: string = "";
  pretrPrezime: string = "";
  pretrPredmet: string = "";

  constructor(private service: ZService, private router: Router) {}

  ngOnInit(): void {
    this.service.dohvUkupanBrojUcenika().subscribe(
      data1 => {
        this.ukupanBrUcenika = data1;
        this.service.dohvUkupanBrojAktivnihNastavnika().subscribe(
          data2 => {
            this.ukupanBrPrihvacenihNastavnika = data2;
            this.service.dohvBrojOdrzanihCasovaPrethNedelja().subscribe(
              data3 => {
                this.brCasovaPrethNedelja = data3;
                this.service.dohvBrojOdrzanihCasovaPrethMesec().subscribe(
                  data4 => {
                    this.brCasovaPrethMesec = data4;
                    this.service.dohvPredmete().subscribe(
                      data5 => {
                        let cnt = data5.length;
                        for (let pr of data5) {
                          this.service.dohvAngazovaneNastavnike(pr.naziv).subscribe(
                            data6 => {
                              cnt += data6.length - 1;
                              if (data6.length > 0) {
                                for (let nast of data6) {
                                  this.service.dohvKorisnika(nast.kor_ime).subscribe(
                                    data7 => {
                                      --cnt;
                                      this.niz.push({
                                        predmet: pr.naziv,
                                        nIme: data7.ime,
                                        nPrezime: data7.prezime
                                      });
                                      if (cnt == 0) {
                                        this.fNiz = JSON.parse(JSON.stringify(this.niz));
                                        this.sortirajPredmetAsc();
                                      }
                                    }
                                  );
                                }
                              }
                              else if (cnt == 0) {
                                this.fNiz = JSON.parse(JSON.stringify(this.niz));
                                this.sortirajPredmetAsc();
                              }
                            }
                          );
                        }
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

  sortirajImeAsc() {
    this.fNiz.sort((a, b) => {
      if (a.nIme < b.nIme) return -1;
      if (a.nIme > b.nIme) return 1;
      return 0;
    });
  }

  sortirajImeDesc() {
    this.fNiz.sort((a, b) => {
      if (a.nIme < b.nIme) return 1;
      if (a.nIme > b.nIme) return -1;
      return 0;
    });
  }

  sortirajPrezimeAsc() {
    this.fNiz.sort((a, b) => {
      if (a.nPrezime < b.nPrezime) return -1;
      if (a.nPrezime > b.nPrezime) return 1;
      return 0;
    });
  }

  sortirajPrezimeDesc() {
    this.fNiz.sort((a, b) => {
      if (a.nPrezime < b.nPrezime) return 1;
      if (a.nPrezime > b.nPrezime) return -1;
      return 0;
    });
  }

  sortirajPredmetAsc() {
    this.fNiz.sort((a, b) => {
      if (a.predmet < b.predmet) return -1;
      if (a.predmet > b.predmet) return 1;
      return 0;
    });
  }

  sortirajPredmetDesc() {
    this.fNiz.sort((a, b) => {
      if (a.predmet < b.predmet) return 1;
      if (a.predmet > b.predmet) return -1;
      return 0;
    });
  }

  pretrazi() {
    this.fNiz = JSON.parse(JSON.stringify(this.niz));
    if (this.pretrPredmet !== "")
      this.fNiz = this.fNiz.filter(elem => elem.predmet.toLowerCase().includes(this.pretrPredmet));
    if (this.pretrIme !== "")
      this.fNiz = this.fNiz.filter(elem => elem.nIme.toLowerCase().includes(this.pretrIme));
    if (this.pretrPrezime !== "")
      this.fNiz = this.fNiz.filter(elem => elem.nPrezime.toLowerCase().includes(this.pretrPrezime));
  }

}
