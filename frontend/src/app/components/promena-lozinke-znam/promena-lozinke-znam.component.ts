import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZService } from 'src/app/services/z.service';

@Component({
  selector: 'app-promena-lozinke-znam',
  templateUrl: './promena-lozinke-znam.component.html',
  styleUrls: ['./promena-lozinke-znam.component.css']
})
export class PromenaLozinkeZnamComponent implements OnInit {

  kor_ime: string = "";
  tip: string = "";
  stara_lozinka: string = "";
  nova_lozinka: string = "";
  p_nova_lozinka: string = "";
  poruka: string = "";

  constructor(private service: ZService, private router: Router) {}

  ngOnInit(): void {
    this.kor_ime = localStorage.getItem("ulogovani")!;
    this.tip = localStorage.getItem("tip")!;
  }

  promeniLozinku() {
    if (this.stara_lozinka === "") this.poruka = "Morate uneti staru lozinku.";
    else if (this.nova_lozinka === "") this.poruka = "Morate uneti novu lozinku.";
    else if (this.nova_lozinka !== this.p_nova_lozinka) this.poruka = "Nova i ponovljena nova lozinka se ne poklapaju.";
    else {
      const regexLozinka = /^(?=[a-zA-Z])(?=.*[A-Z])(?=(?:[^a-z]*[a-z]){3})(?=.*[!@#$%^&*])\S{6,10}$/;
      if (!regexLozinka.test(this.nova_lozinka)) this.poruka = "Niste uneli novu lozinku u dobrom formatu.";
      else {
        this.service.promeniLozinkuZnamStaru(this.kor_ime, this.stara_lozinka, this.nova_lozinka).subscribe(
          data => {
            if (data.msg != "OK") this.poruka = data.msg;
            else {
              localStorage.clear();
              if (this.tip === "Admin") this.router.navigate(["loginAdmin"]);
              else this.router.navigate(["login"]);
            }
          }
        );
      }
    }
  }

}
