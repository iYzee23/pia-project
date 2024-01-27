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
import { NastavnikComponent } from './components/nastavnik/nastavnik.component';
import { UcenikComponent } from './components/ucenik/ucenik.component';
import { AdminComponent } from './components/admin/admin.component';
import { RegistracijaNastavniciComponent } from './components/registracija-nastavnici/registracija-nastavnici.component';
import { PromenaLozinkeZnamComponent } from './components/promena-lozinke-znam/promena-lozinke-znam.component';
import { PromenaLozinkeNeZnam3Component } from './components/promena-lozinke-ne-znam3/promena-lozinke-ne-znam3.component';

const routes: Routes = [
  {path: '', component: NeregistrovaniComponent, canActivate: [noLoginGuard]},
  {path: 'login', component: LoginComponent, canActivate: [noLoginGuard]},
  {path: 'loginAdmin', component: LoginAdminComponent, canActivate: [noLoginGuard]},
  {path: 'registracijaUcenici', component: RegistracijaUceniciComponent, canActivate: [noLoginGuard]},
  {path: 'registracijaNastavnici', component: RegistracijaNastavniciComponent, canActivate: [noLoginGuard]},
  {path: 'promenaLozinkeZnam', component: PromenaLozinkeZnamComponent, canActivate: [promenaLozinkeGuard]},
  {path: 'promenaLozinkeNeZnam1', component: PromenaLozinkeNeZnam1Component, canActivate: [noLoginGuard]},
  {path: 'promenaLozinkeNeZnam2', component: PromenaLozinkeNeZnam2Component, canActivate: [noLoginGuard]},
  {path: 'promenaLozinkeNeZnam3', component: PromenaLozinkeNeZnam3Component, canActivate: [noLoginGuard]},
  {path: 'ucenik', component: UcenikComponent, canActivate: [loginGuard]},
  {path: 'nastavnik', component: NastavnikComponent, canActivate: [loginGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [loginGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
