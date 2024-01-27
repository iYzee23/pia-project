import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { noLoginGuard } from './guards/no-login.guard';
import { loginGuard } from './guards/login.guard';
import { promenaLozinkeGuard } from './guards/promena-lozinke.guard';
import { NeregistrovaniComponent } from './components/neregistrovani/neregistrovani.component';
import { LoginComponent } from './components/login/login.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { RegistracijaUceniciComponent } from './components/registracija-ucenici/registracija-ucenici.component';
import { RegistracijaNastavnici1Component } from './components/registracija-nastavnici1/registracija-nastavnici1.component';
import { RegistracijaNastavnici2Component } from './components/registracija-nastavnici2/registracija-nastavnici2.component';
import { PromenaLozinkePocetnaComponent } from './components/promena-lozinke-pocetna/promena-lozinke-pocetna.component';
import { PromenaLozinkeNeZnam1Component } from './components/promena-lozinke-ne-znam1/promena-lozinke-ne-znam1.component';
import { PromenaLozinkeNeZnam2Component } from './components/promena-lozinke-ne-znam2/promena-lozinke-ne-znam2.component';
import { NastavnikComponent } from './components/nastavnik/nastavnik.component';
import { UcenikComponent } from './components/ucenik/ucenik.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  {path: '', component: NeregistrovaniComponent, canActivate: [noLoginGuard]},
  {path: 'login', component: LoginComponent, canActivate: [noLoginGuard]},
  {path: 'loginAdmin', component: LoginAdminComponent, canActivate: [noLoginGuard]},
  {path: 'registracijaUcenici', component: RegistracijaUceniciComponent, canActivate: [noLoginGuard]},
  {path: 'registracijaNastavnici1', component: RegistracijaNastavnici1Component, canActivate: [noLoginGuard]},
  {path: 'registracijaNastavnici2', component: RegistracijaNastavnici2Component, canActivate: [noLoginGuard]},
  {path: 'promenaLozinkePocetna', component: PromenaLozinkePocetnaComponent, canActivate: [noLoginGuard]},
  {path: 'promenaLozinke', component: NeregistrovaniComponent, canActivate: [promenaLozinkeGuard]},
  {path: 'promenaLozinkeNeZnam1', component: PromenaLozinkeNeZnam1Component, canActivate: [noLoginGuard]},
  {path: 'promenaLozinkeNeZnam2', component: PromenaLozinkeNeZnam2Component, canActivate: [noLoginGuard]},
  {path: 'ucenik', component: UcenikComponent, canActivate: [loginGuard]},
  {path: 'nastavnik', component: NastavnikComponent, canActivate: [loginGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [loginGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
