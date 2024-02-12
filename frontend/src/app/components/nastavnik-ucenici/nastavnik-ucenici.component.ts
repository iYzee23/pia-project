import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/korisnik';
import { ZService } from 'src/app/services/z.service';

@Component({
  selector: 'app-nastavnik-ucenici',
  templateUrl: './nastavnik-ucenici.component.html',
  styleUrls: ['./nastavnik-ucenici.component.css']
})
export class NastavnikUceniciComponent implements OnInit {

  kor_ime: string = "";
  ucenici_kor_ime: string[] = [];
  ucenici: {
    kor_ime: string,
    ime: string,
    prezime: string
  }[] = [];

  constructor(private service: ZService, private router: Router) {}

  ngOnInit(): void {
    this.kor_ime = localStorage.getItem("ulogovani")!;
    const datumSad = new Date();
    datumSad.setTime(datumSad.getTime() + 3600000);
    const sad = datumSad.toISOString().slice(0, 16) + "Z";

    this.service.dohvCasoveNastavnika(this.kor_ime).subscribe(
      data1 => {
        for (let cas of data1) {
          if (cas.status === "Prihvacen" && cas.datum_vreme_start < sad && !this.ucenici_kor_ime.includes(cas.ucenik))
            this.ucenici_kor_ime.push(cas.ucenik);
        }
        for (let uc of this.ucenici_kor_ime) {
          this.service.dohvKorisnika(uc).subscribe(
            data2 => {
              this.ucenici.push({
                kor_ime: data2.kor_ime,
                ime: data2.ime,
                prezime: data2.prezime
              });
            }
          );
        }
      }
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["neregistrovani"]);
  }

}
