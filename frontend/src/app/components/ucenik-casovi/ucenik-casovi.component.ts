import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cas } from 'src/app/models/cas';
import { ZService } from 'src/app/services/z.service';

@Component({
  selector: 'app-ucenik-casovi',
  templateUrl: './ucenik-casovi.component.html',
  styleUrls: ['./ucenik-casovi.component.css']
})
export class UcenikCasoviComponent implements OnInit {

  kor_ime: string = "";
  odrzani_casovi: Cas[] = [];
  buduci_casovi: Cas[] = [];
  showJitsiMeet: boolean = false;
  casID: string = "";
  roomName: string = "";
  displayName: string = "";
  email: string = "";

  constructor(private service: ZService, private router: Router) {}

  ngOnInit(): void {
    this.kor_ime = localStorage.getItem("ulogovani")!;
    const sadDatum = new Date();
    sadDatum.setTime(sadDatum.getTime() + 3600000);
    const sad = sadDatum.toISOString().slice(0, 16) + "Z";

    this.service.dohvCasoveUcenika(this.kor_ime).subscribe(
      data => {
        let cnt = data.length;
        for (let cas of data) {
          this.service.dohvKorisnika(cas.nastavnik).subscribe(
            tData => {
              cas.nIme = tData.ime;
              cas.nPrezime = tData.prezime;
              if (cas.status === "Prihvacen" && cas.datum_vreme_kraj < sad) this.odrzani_casovi.push(cas);
              else if (cas.status === "Prihvacen" && cas.datum_vreme_kraj > sad) {
                const msDiff = (new Date(cas.datum_vreme_start).getTime()) - sadDatum.getTime();
                cas.ucionicaDisabled = (msDiff > 15 * 60 * 1000);
                // cas.ucionicaDisabled = (msDiff > 7 * 24 * 60 * 60 * 1000);
                this.buduci_casovi.push(cas);
              }
              if (--cnt == 0) this.sortirajCasoveAsc();
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

  dodajKomentar(_id: string) {
    localStorage.setItem("cas", _id);
    this.router.navigate(["ucenikKomentar"]);
  }

  pokreniUcionicu(cas: Cas): void {
    this.service.dohvKorisnika(cas.ucenik).subscribe(
      data => {
        this.casID = cas._id;
        this.roomName = cas._id + this.kor_ime + cas.nastavnik;
        this.displayName = data.ime + " " + data.prezime;
        this.email = data.email;
        this.showJitsiMeet = !this.showJitsiMeet;
      }
    );
  }

  sortirajCasoveAsc() {
    this.odrzani_casovi.sort((a, b) => {
      if (a.datum_vreme_start < b.datum_vreme_start) return 1;
      if (a.datum_vreme_start > b.datum_vreme_start) return -1;
      return 0;
    });
    this.buduci_casovi.sort((a, b) => {
      if (a.datum_vreme_start < b.datum_vreme_start) return -1;
      if (a.datum_vreme_start > b.datum_vreme_start) return 1;
      return 0;
    });
  }

}
