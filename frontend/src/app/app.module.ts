import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { RegistracijaUceniciComponent } from './components/registracija-ucenici/registracija-ucenici.component';
import { PromenaLozinkeZnamComponent } from './components/promena-lozinke-znam/promena-lozinke-znam.component';
import { PromenaLozinkeNeZnam1Component } from './components/promena-lozinke-ne-znam1/promena-lozinke-ne-znam1.component';
import { PromenaLozinkeNeZnam2Component } from './components/promena-lozinke-ne-znam2/promena-lozinke-ne-znam2.component';
import { PromenaLozinkeNeZnam3Component } from './components/promena-lozinke-ne-znam3/promena-lozinke-ne-znam3.component';
import { NeregistrovaniComponent } from './components/neregistrovani/neregistrovani.component';
import { UcenikComponent } from './components/ucenik/ucenik.component';
import { NastavnikComponent } from './components/nastavnik/nastavnik.component';
import { AdminComponent } from './components/admin/admin.component';
import { RegistracijaNastavniciComponent } from './components/registracija-nastavnici/registracija-nastavnici.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginAdminComponent,
    RegistracijaUceniciComponent,
    RegistracijaNastavniciComponent,
    PromenaLozinkeZnamComponent,
    PromenaLozinkeNeZnam1Component,
    PromenaLozinkeNeZnam2Component,
    PromenaLozinkeNeZnam3Component,
    NeregistrovaniComponent,
    UcenikComponent,
    NastavnikComponent,
    AdminComponent
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
