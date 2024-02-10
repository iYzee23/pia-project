import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ZService } from 'src/app/services/z.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {

  kor_ime: string = "";
  lozinka: string = "";
  poruka: string = "";

  constructor(private service: ZService, private router: Router) {}

  login() {
    if (this.kor_ime === "") this.poruka = "Morate uneti korisnicko ime.";
    else if (this.lozinka === "") this.poruka = "Morate uneti lozinku.";
    else {
      this.service.loginAdmin(this.kor_ime, this.lozinka).subscribe(
        data => {
          if (!data) this.poruka = "Losi podaci. Pokusajte ponovo!";
          else {
            this.poruka = "";
            localStorage.setItem("ulogovani", this.kor_ime);
            localStorage.setItem("tip", "Admin");
            this.router.navigate(["adminProfil"]);
          }
        }
      );
    }
  }

}
