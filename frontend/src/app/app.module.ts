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
import { RegistracijaNastavniciComponent } from './components/registracija-nastavnici/registracija-nastavnici.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { PdfUploadComponent } from './components/pdf-upload/pdf-upload.component';
import { UcenikProfilComponent } from './components/ucenik-profil/ucenik-profil.component';
import { UcenikNastavniciComponent } from './components/ucenik-nastavnici/ucenik-nastavnici.component';
import { UcenikDetaljiComponent } from './components/ucenik-detalji/ucenik-detalji.component';
import { UcenikPrvaComponent } from './components/ucenik-prva/ucenik-prva.component';
import { UcenikDrugaComponent } from './components/ucenik-druga/ucenik-druga.component';
import { UcenikCasoviComponent } from './components/ucenik-casovi/ucenik-casovi.component';
import { UcenikKomentarComponent } from './components/ucenik-komentar/ucenik-komentar.component';
import { UcenikObavestenjaComponent } from './components/ucenik-obavestenja/ucenik-obavestenja.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { JitsiMeetComponent } from './components/jitsi-meet/jitsi-meet.component';
import { ZvezdiceComponent } from './components/zvezdice/zvezdice.component';
import { NastavnikProfilComponent } from './components/nastavnik-profil/nastavnik-profil.component';
import { NastavnikCasoviComponent } from './components/nastavnik-casovi/nastavnik-casovi.component';
import { NastavnikUceniciComponent } from './components/nastavnik-ucenici/nastavnik-ucenici.component';
import { NastavnikDosijeComponent } from './components/nastavnik-dosije/nastavnik-dosije.component';
import { AdminProfilComponent } from './components/admin-profil/admin-profil.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AdminKorisniciComponent } from './components/admin-korisnici/admin-korisnici.component';
import { AdminPredmetiComponent } from './components/admin-predmeti/admin-predmeti.component';
import { AdminDetaljiComponent } from './components/admin-detalji/admin-detalji.component';

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
    ImageUploadComponent,
    PdfUploadComponent,
    UcenikProfilComponent,
    UcenikNastavniciComponent,
    UcenikDetaljiComponent,
    UcenikPrvaComponent,
    UcenikDrugaComponent,
    UcenikCasoviComponent,
    UcenikKomentarComponent,
    UcenikObavestenjaComponent,
    JitsiMeetComponent,
    ZvezdiceComponent,
    NastavnikProfilComponent,
    NastavnikCasoviComponent,
    NastavnikUceniciComponent,
    NastavnikDosijeComponent,
    AdminProfilComponent,
    AdminKorisniciComponent,
    AdminPredmetiComponent,
    AdminDetaljiComponent
  ],
  imports: [
    BrowserModule,
    FullCalendarModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgApexchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
