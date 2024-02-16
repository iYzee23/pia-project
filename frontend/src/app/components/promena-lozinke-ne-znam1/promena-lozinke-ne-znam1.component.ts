import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ZService } from 'src/app/services/z.service';

@Component({
  selector: 'app-promena-lozinke-ne-znam1',
  templateUrl: './promena-lozinke-ne-znam1.component.html',
  styleUrls: ['./promena-lozinke-ne-znam1.component.css']
})
export class PromenaLozinkeNeZnam1Component {

  kor_ime: string = "";
  poruka: string = "";

  constructor(private service: ZService, private router: Router) {}

  idiDalje() {
    if (this.kor_ime === "") this.poruka = "Morate uneti korisnicko ime.";
    else {
      this.service.dohvKorisnika(this.kor_ime).subscribe(
        data => {
          if (!data) this.poruka = "Nepostojece korisnicko ime.";
          else {
            localStorage.setItem("promenaInit", this.kor_ime + "###" + data.tip);
            this.router.navigate(["promenaLozinkeNeZnam2"]);
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
