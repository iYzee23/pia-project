import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cas } from 'src/app/models/cas';
import { Obavestenje } from 'src/app/models/obavestenje';
import { ZService } from 'src/app/services/z.service';

@Component({
  selector: 'app-ucenik-obavestenja',
  templateUrl: './ucenik-obavestenja.component.html',
  styleUrls: ['./ucenik-obavestenja.component.css']
})
export class UcenikObavestenjaComponent implements OnInit {

  kor_ime: string = "";
  obavestenja: Obavestenje[] = [];

  constructor(private service: ZService, private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.kor_ime = localStorage.getItem("ulogovani")!;
    this.obavestenja = [];
    this.service.dohvCasoveUcenika(this.kor_ime).subscribe(
      data => {
        let cnt = data.length;
        for (let cas of data) {
          this.service.dohvObavestenjaZaCas(cas._id).subscribe(
            tData => {
              cnt += tData.length - 1;
              this.service.dohvKorisnika(cas.nastavnik).subscribe(
                fData => {
                  if (tData.length > 0) {
                    for (let ob of tData) {
                      ob.nIme = fData.ime;
                      ob.nPrezime = fData.prezime;
                      ob.predmet = cas.predmet;
                      ob.datum_vreme_start = cas.datum_vreme_start;
                      ob.datum_vreme_kraj = cas.datum_vreme_kraj;
                      ob.kratak_opis = cas.kratak_opis;
                      this.obavestenja.push(ob);
                      if (--cnt == 0) this.sortirajObavestenjaDesc();
                    }
                  }
                  else if (--cnt == 0) this.sortirajObavestenjaDesc();
                }
              );
            }
          );
        }
      }
    );
  }

  formatirajDatumVreme(datum_vreme: string): string {
    const [datum, vreme] = datum_vreme.split("T");
    return datum + ", " + vreme.slice(0, -1);
  }

  sortirajObavestenjaDesc() {
    this.obavestenja.sort((a, b) => {
      if (a.datum_vreme_start < b.datum_vreme_start) return 1;
      if (a.datum_vreme_start > b.datum_vreme_start) return -1;
      return 0;
    })
  }

  procitajObavestenje(_id: string) {
    this.service.procitajObavestenje(_id).subscribe(
      data => {
        this.ngOnInit();
      }
    );
  }

  back() {
    this.location.back();
  }

}
