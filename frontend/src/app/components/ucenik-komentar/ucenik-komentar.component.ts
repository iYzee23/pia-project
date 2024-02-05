import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZService } from 'src/app/services/z.service';

@Component({
  selector: 'app-ucenik-komentar',
  templateUrl: './ucenik-komentar.component.html',
  styleUrls: ['./ucenik-komentar.component.css']
})
export class UcenikKomentarComponent implements OnInit {

  cas_id: string = "";
  ocena_ucenik: number = 0;
  komentar_ucenik: string = "";
  poruka: string = "";

  constructor(private service: ZService, private router: Router) {}

  ngOnInit(): void {
    this.cas_id = localStorage.getItem("cas")!;
  }

  dodajKomentar() {
    if (this.ocena_ucenik < 1 || this.ocena_ucenik > 5) this.poruka = "Ocena mora biti u opsegu od 1 do 5.";
    else if (this.komentar_ucenik === "") this.poruka = "Morate uneti i komentar.";
    else {
      this.service.unesiKomentarIOcenuUcenik(this.cas_id, this.komentar_ucenik, this.ocena_ucenik).subscribe(
        data => {
          this.back();
        }
      );
    }
  }

  handleRatingSelected(rating: number) {
    this.ocena_ucenik = rating;
  }

  back() {
    localStorage.removeItem("cas");
    this.router.navigate(["ucenikCasovi"]);
  }

}
