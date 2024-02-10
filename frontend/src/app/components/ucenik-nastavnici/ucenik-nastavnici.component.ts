import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZService } from 'src/app/services/z.service';

@Component({
  selector: 'app-ucenik-nastavnici',
  templateUrl: './ucenik-nastavnici.component.html',
  styleUrls: ['./ucenik-nastavnici.component.css']
})
export class UcenikNastavniciComponent implements OnInit {

  kor_ime: string = "";
  niz: {predmet: string, nIme: string, nPrezime: string, nKorIme: string, prosek: number, zvezdice: string}[] = [];
  fNiz: {predmet: string, nIme: string, nPrezime: string, nKorIme: string, prosek: number, zvezdice: string}[] = [];
  pretrIme: string = "";
  pretrPrezime: string = "";
  pretrPredmet: string = "";

  constructor(private service: ZService, private router: Router) {}

  generisiZvezdice(prosek: number) {
    let zvezdice = '';
    for (let i = 0; i < 5; i++) {
        if (prosek >= i + 1) zvezdice += '<i class="fa fa-star"></i>';
        else if (prosek >= i + 0.5) zvezdice += '<i class="fa fa-star-half-o"></i>';
        else zvezdice += '<i class="fa fa-star-o"></i>';
    }
    return zvezdice;
  }

  truncateToTwoDecimals(num: number): number {
    return Math.round(num * 100) / 100;
  }

  ngOnInit(): void {
    this.kor_ime = localStorage.getItem("ulogovani")!;
    this.service.dohvUcenika(this.kor_ime).subscribe(
      data1 => {
        const tip_skole = data1.tip_skole;
        const tr_razred = data1.tr_razred;
        const uzrast = tip_skole.includes("Srednja") ? "Srednja skola" :
          (tr_razred <= 4 ? "Osnovna skola [1-4]" : "Osnovna skola [5-8]");
        this.service.dohvPredmete().subscribe(
          data2 => {
            let cnt = data2.length;
            for (let pr of data2) {
              this.service.dohvAngazovaneNastavnikeExt(pr.naziv, uzrast).subscribe(
                data3 => {
                  cnt += data3.length - 1;
                  if (data3.length > 0) {
                    for (let nast of data3) {
                      this.service.dohvKorisnika(nast.kor_ime).subscribe(
                        data4 => {
                          this.service.dohvNastavnika(nast.kor_ime).subscribe(
                            data5 => {
                              --cnt;
                              this.niz.push({
                                predmet: pr.naziv,
                                nIme: data4.ime,
                                nPrezime: data4.prezime,
                                nKorIme: data5.kor_ime,
                                prosek: this.truncateToTwoDecimals(data5.ocena),
                                zvezdice: this.generisiZvezdice(data5.ocena)
                              });
                              if (cnt == 0) {
                                this.fNiz = JSON.parse(JSON.stringify(this.niz));
                                this.sortirajPredmetAsc();
                              }
                            }
                          );
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

  sortirajProsekAsc() {
    this.fNiz.sort((a, b) => {
      if (a.prosek < b.prosek) return -1;
      if (a.prosek > b.prosek) return 1;
      return 0;
    });
  }

  sortirajProsekDesc() {
    this.fNiz.sort((a, b) => {
      if (a.prosek < b.prosek) return 1;
      if (a.prosek > b.prosek) return -1;
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

  logout() {
    localStorage.clear();
    this.router.navigate(["neregistrovani"]);
  }

}
