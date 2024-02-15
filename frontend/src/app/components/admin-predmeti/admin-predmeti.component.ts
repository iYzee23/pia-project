import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Predmet } from 'src/app/models/predmet';
import { ZService } from 'src/app/services/z.service';

@Component({
  selector: 'app-admin-predmeti',
  templateUrl: './admin-predmeti.component.html',
  styleUrls: ['./admin-predmeti.component.css']
})
export class AdminPredmetiComponent implements OnInit {

  kor_ime: string = "";
  novi_predm: string = "";
  prihvaceni_predm: Predmet[] = [];
  u_obradi_predm: Predmet[] = [];
  odbijeni_predm: Predmet[] = [];
  poruka: string = "";

  constructor(
    private service: ZService, private router: Router,
    private aRoute: ActivatedRoute, private location: Location
  ) {}

  ngOnInit(): void {
    this.kor_ime = localStorage.getItem("ulogovani")!;
    this.service.dohvSvePredmete().subscribe(
      data => {
        this.prihvaceni_predm = data.filter(item => item.status === "Prihvacen");
        this.u_obradi_predm = data.filter(item => item.status === "U obradi");
        this.odbijeni_predm = data.filter(item => item.status === "Odbijen");
      }
    );
  }

  prihvatiPredmet(predm: Predmet) {
    this.service.prihvatiPredmet(predm.naziv).subscribe(
      data => {
        this.ngOnInit();
      }
    );
  }

  odbijPredmet(predm: Predmet) {
    this.service.odbijPredmet(predm.naziv).subscribe(
      data => {
        this.ngOnInit();
      }
    );
  }

  dodajPredmet() {
    if (this.novi_predm === "") this.poruka = "Morate uneti naziv predmeta koji dodajete.";
    else {
      this.poruka = "Uspesno ste dodali novi predmet.";
      this.service.dodajPredmet(this.novi_predm).subscribe(
        data => {
          this.ngOnInit();
        }
      );
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["neregistrovani"]);
  }

  back() {
    this.location.back();
  }

}
