import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZService } from 'src/app/services/z.service';

@Component({
  selector: 'app-promena-lozinke-ne-znam2',
  templateUrl: './promena-lozinke-ne-znam2.component.html',
  styleUrls: ['./promena-lozinke-ne-znam2.component.css']
})
export class PromenaLozinkeNeZnam2Component implements OnInit {

  kor_ime: string = "";
  bezb_pitanje: string = "";
  bezb_odgovor: string = "";
  poruka: string = "";

  constructor(private service: ZService, private router: Router) {}

  ngOnInit(): void {
    this.kor_ime = localStorage.getItem("promenaInit")!.split("###")[0];
    this.service.dohvBezbPitanje(this.kor_ime).subscribe(
      data => {
        this.bezb_pitanje = data.msg;
      }
    );
  }

  idiDalje() {
    if (this.bezb_odgovor === "") this.poruka = "Morate uneti bezbedonosni odgovor.";
    else {
      this.service.proveriBezbOdgovor(this.kor_ime, this.bezb_odgovor).subscribe(
        data => {
          if (!data) this.poruka = "Neispravan bezbedonosni odgovor.";
          else {
            localStorage.setItem("promenaApproved", this.bezb_odgovor);
            this.router.navigate(["promenaLozinkeNeZnam3"]);
          }
        }
      );
    }
  }

  pocetna() {
    localStorage.clear();
    this.router.navigate(["neregistrovani"]);
  }

}
