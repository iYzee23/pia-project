import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { noLoginGuard } from './guards/no-login.guard';
import { loginGuard } from './guards/login.guard';
import { promenaLozinkeGuard } from './guards/promena-lozinke.guard';
import { NeregistrovaniComponent } from './components/neregistrovani/neregistrovani.component';
import { LoginComponent } from './components/login/login.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { RegistracijaUceniciComponent } from './components/registracija-ucenici/registracija-ucenici.component';
import { PromenaLozinkeNeZnam1Component } from './components/promena-lozinke-ne-znam1/promena-lozinke-ne-znam1.component';
import { PromenaLozinkeNeZnam2Component } from './components/promena-lozinke-ne-znam2/promena-lozinke-ne-znam2.component';
import { RegistracijaNastavniciComponent } from './components/registracija-nastavnici/registracija-nastavnici.component';
import { PromenaLozinkeZnamComponent } from './components/promena-lozinke-znam/promena-lozinke-znam.component';
import { PromenaLozinkeNeZnam3Component } from './components/promena-lozinke-ne-znam3/promena-lozinke-ne-znam3.component';
import { UcenikProfilComponent } from './components/ucenik-profil/ucenik-profil.component';
import { UcenikNastavniciComponent } from './components/ucenik-nastavnici/ucenik-nastavnici.component';
import { UcenikDetaljiComponent } from './components/ucenik-detalji/ucenik-detalji.component';
import { UcenikPrvaComponent } from './components/ucenik-prva/ucenik-prva.component';
import { UcenikDrugaComponent } from './components/ucenik-druga/ucenik-druga.component';
import { UcenikCasoviComponent } from './components/ucenik-casovi/ucenik-casovi.component';
import { UcenikKomentarComponent } from './components/ucenik-komentar/ucenik-komentar.component';
import { UcenikObavestenjaComponent } from './components/ucenik-obavestenja/ucenik-obavestenja.component';
import { NastavnikProfilComponent } from './components/nastavnik-profil/nastavnik-profil.component';
import { NastavnikCasoviComponent } from './components/nastavnik-casovi/nastavnik-casovi.component';
import { NastavnikUceniciComponent } from './components/nastavnik-ucenici/nastavnik-ucenici.component';
import { NastavnikDosijeComponent } from './components/nastavnik-dosije/nastavnik-dosije.component';
import { AdminProfilComponent } from './components/admin-profil/admin-profil.component';

const ulogg = localStorage.getItem("ulogovani") !== null;
let tipp: any = localStorage.getItem("tip");
if (tipp) {
  if (tipp === "Ucenik") tipp = UcenikProfilComponent;
  else if (tipp === "Nastavnik") tipp = NastavnikProfilComponent;
  else tipp = AdminProfilComponent;
}
console.log(ulogg);
console.log(tipp);

const routes: Routes = [
  {path: 'neregistrovani', component: NeregistrovaniComponent, canActivate: [noLoginGuard]},
  {path: 'login', component: LoginComponent, canActivate: [noLoginGuard]},
  {path: 'loginAdmin', component: LoginAdminComponent, canActivate: [noLoginGuard]},
  {path: 'registracijaUcenici', component: RegistracijaUceniciComponent, canActivate: [noLoginGuard]},
  {path: 'registracijaNastavnici', component: RegistracijaNastavniciComponent, canActivate: [noLoginGuard]},
  {path: 'promenaLozinkeZnam', component: PromenaLozinkeZnamComponent, canActivate: [loginGuard]},
  {path: 'promenaLozinkeNeZnam1', component: PromenaLozinkeNeZnam1Component, canActivate: [noLoginGuard]},
  {path: 'promenaLozinkeNeZnam2', component: PromenaLozinkeNeZnam2Component, canActivate: [noLoginGuard]},
  {path: 'promenaLozinkeNeZnam3', component: PromenaLozinkeNeZnam3Component, canActivate: [promenaLozinkeGuard]},
  {path: 'ucenikProfil', component: UcenikProfilComponent, canActivate: [loginGuard]},
  {path: 'ucenikNastavnici', component: UcenikNastavniciComponent, canActivate: [loginGuard]},
  {path: 'ucenikDetalji', component: UcenikDetaljiComponent, canActivate: [loginGuard]},
  {path: 'ucenikPrva', component: UcenikPrvaComponent, canActivate: [loginGuard]},
  {path: 'ucenikDruga', component: UcenikDrugaComponent, canActivate: [loginGuard]},
  {path: 'ucenikCasovi', component: UcenikCasoviComponent, canActivate: [loginGuard]},
  {path: 'ucenikKomentar', component: UcenikKomentarComponent, canActivate: [loginGuard]},
  {path: 'ucenikObavestenja', component: UcenikObavestenjaComponent, canActivate: [loginGuard]},
  {path: 'nastavnikProfil', component: NastavnikProfilComponent, canActivate: [loginGuard]},
  {path: 'nastavnikCasovi', component: NastavnikCasoviComponent, canActivate: [loginGuard]},
  {path: 'nastavnikUcenici', component: NastavnikUceniciComponent, canActivate: [loginGuard]},
  {path: 'nastavnikDosije', component: NastavnikDosijeComponent, canActivate: [loginGuard]},
  {path: 'adminProfil', component: AdminProfilComponent, canActivate: [loginGuard]},
  {path: '**', component: ulogg ? tipp : NeregistrovaniComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
