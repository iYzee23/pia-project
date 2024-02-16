import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZService } from 'src/app/services/z.service';

@Component({
  selector: 'app-promena-lozinke-ne-znam3',
  templateUrl: './promena-lozinke-ne-znam3.component.html',
  styleUrls: ['./promena-lozinke-ne-znam3.component.css']
})
export class PromenaLozinkeNeZnam3Component implements OnInit {

  kor_ime: string = "";
  tip: string = "";
  nova_lozinka: string = "";
  p_nova_lozinka: string = "";
  poruka: string = "";

  constructor(private service: ZService, private router: Router) {}

  ngOnInit(): void {
    this.kor_ime = localStorage.getItem("promenaInit")!.split("###")[0];
    this.tip = localStorage.getItem("promenaInit")!.split("###")[1];
  }

  promeniLozinku() {
    if (this.nova_lozinka === "") this.poruka = "Morate uneti novu lozinku.";
    else if (this.nova_lozinka !== this.p_nova_lozinka) this.poruka = "Nova i ponovljena nova lozinka se ne poklapaju.";
    else {
      const regexLozinka = /^(?=[a-zA-Z])(?=.*[A-Z])(?=(?:[^a-z]*[a-z]){3})(?=.*[!@#$%^&*])\S{6,10}$/;
      if (!regexLozinka.test(this.nova_lozinka)) this.poruka = "Niste uneli novu lozinku u dobrom formatu.";
      else {
        this.service.promeniLozinkuNeZnamStaru(this.kor_ime, this.nova_lozinka).subscribe(
          data => {
            localStorage.clear();
            if (this.tip === "Admin") this.router.navigate(["loginAdmin"]);
            else this.router.navigate(["login"]);
          }
        );
      }
    }
  }

  pocetna() {
    localStorage.clear();
    this.router.navigate(["neregistrovani"]);
  }

}
