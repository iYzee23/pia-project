import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { RegistracijaUceniciComponent } from './components/registracija-ucenici/registracija-ucenici.component';
import { RegistracijaNastavnici1Component } from './components/registracija-nastavnici1/registracija-nastavnici1.component';
import { RegistracijaNastavnici2Component } from './components/registracija-nastavnici2/registracija-nastavnici2.component';
import { PromenaLozinkeComponent } from './components/promena-lozinke/promena-lozinke.component';
import { PromenaLozinkeNeZnam1Component } from './components/promena-lozinke-ne-znam1/promena-lozinke-ne-znam1.component';
import { PromenaLozinkeNeZnam2Component } from './components/promena-lozinke-ne-znam2/promena-lozinke-ne-znam2.component';
import { NeregistrovaniComponent } from './components/neregistrovani/neregistrovani.component';
import { UcenikComponent } from './components/ucenik/ucenik.component';
import { NastavnikComponent } from './components/nastavnik/nastavnik.component';
import { AdminComponent } from './components/admin/admin.component';
import { PromenaLozinkePocetnaComponent } from './components/promena-lozinke-pocetna/promena-lozinke-pocetna.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginAdminComponent,
    RegistracijaUceniciComponent,
    RegistracijaNastavnici1Component,
    RegistracijaNastavnici2Component,
    PromenaLozinkeComponent,
    PromenaLozinkeNeZnam1Component,
    PromenaLozinkeNeZnam2Component,
    NeregistrovaniComponent,
    UcenikComponent,
    NastavnikComponent,
    AdminComponent,
    PromenaLozinkePocetnaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
