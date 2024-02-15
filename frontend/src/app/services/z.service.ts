import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Admin } from '../models/admin';
import { Cas } from '../models/cas';
import { Obavestenje } from '../models/obavestenje';
import { Predmet } from '../models/predmet';
import { Poruka } from '../models/poruka';

@Injectable({
  providedIn: 'root'
})
export class ZService {

  readonly uri = "http://localhost:4000/baza";

  constructor(private http: HttpClient) { }

  login(kor_ime: string, lozinka: string, tip: string) {
    const data = {
      kor_ime: kor_ime,
      lozinka: lozinka,
      tip: tip
    };
    return this.http.post<Korisnik>(this.uri + "/login", data);
  }

  loginAdmin(kor_ime: string, lozinka: string) {
    const data = {
      kor_ime: kor_ime,
      lozinka: lozinka
    };
    return this.http.post<Korisnik>(this.uri + "/loginAdmin", data);
  }

  dohvKorisnika(kor_ime: string) {
    const data = {
      kor_ime: kor_ime
    };
    return this.http.post<Korisnik>(this.uri + "/dohvKorisnika", data);
  }

  dohvUcenika(kor_ime: string) {
    const data = {
      kor_ime: kor_ime
    };
    return this.http.post<Korisnik>(this.uri + "/dohvUcenika", data);
  }

  dohvNastavnika(kor_ime: string) {
    const data = {
      kor_ime: kor_ime
    };
    return this.http.post<Korisnik>(this.uri + "/dohvNastavnika", data);
  }

  registracijaUcenik(kor_ime: string, email: string, lozinka: string, bezb_pitanje: string, bezb_odgovor: string, ime: string, prezime: string, pol: string, adresa: string, telefon: string, prof_slika: string, tip_skole: string, tr_razred: number) {
    const data = {
      kor_ime: kor_ime,
      email: email,
      lozinka: lozinka,
      bezb_pitanje: bezb_pitanje,
      bezb_odgovor: bezb_odgovor,
      ime: ime,
      prezime: prezime,
      pol: pol,
      adresa: adresa,
      telefon: telefon,
      prof_slika: prof_slika,
      tip_skole: tip_skole,
      tr_razred: tr_razred
    };
    return this.http.post<Poruka>(this.uri + "/registracijaUcenik", data);
  }

  registracijaNastavnik(kor_ime: string, email: string, lozinka: string, bezb_pitanje: string, bezb_odgovor: string, ime: string, prezime: string, pol: string, adresa: string, telefon: string, prof_slika: string, cv_pdf: string, predmeti: string[], uzrast: string[], culi_sajt: string) {
    const data = {
      kor_ime: kor_ime,
      email: email,
      lozinka: lozinka,
      bezb_pitanje: bezb_pitanje,
      bezb_odgovor: bezb_odgovor,
      ime: ime,
      prezime: prezime,
      pol: pol,
      adresa: adresa,
      telefon: telefon,
      prof_slika: prof_slika,
      cv_pdf: cv_pdf,
      predmeti: predmeti,
      uzrast: uzrast,
      culi_sajt: culi_sajt
    };
    return this.http.post<Poruka>(this.uri + "/registracijaNastavnik", data);
  }

  prihvatiNastavnika(kor_ime: string) {
    const data = {
      kor_ime: kor_ime
    };
    return this.http.post<Poruka>(this.uri + "/prihvatiNastavnika", data);
  }

  odbijNastavnika(kor_ime: string) {
    const data = {
      kor_ime: kor_ime
    };
    return this.http.post<Poruka>(this.uri + "/odbijNastavnika", data);
  }

  predloziPredmete(predmeti: string[]) {
    const data = {
      predmeti: predmeti
    };
    return this.http.post<Poruka>(this.uri + "/predloziPredmete", data);
  }

  prihvatiPredmet(naziv: string) {
    const data = {
      naziv: naziv
    };
    return this.http.post<Poruka>(this.uri + "/prihvatiPredmet", data);
  }

  dodajPredmet(naziv: string) {
    const data = {
      naziv: naziv
    };
    return this.http.post<Poruka>(this.uri + "/dodajPredmet", data);
  }

  promeniLozinkuZnamStaru(kor_ime: string, staraLozinka: string, novaLozinka: string) {
    const data = {
      kor_ime: kor_ime,
      staraLozinka: staraLozinka,
      novaLozinka: novaLozinka
    };
    return this.http.post<Poruka>(this.uri + "/promeniLozinkuZnamStaru", data);
  }

  promeniLozinkuNeZnamStaru(kor_ime: string, novaLozinka: string) {
    const data = {
      kor_ime: kor_ime,
      novaLozinka: novaLozinka
    };
    return this.http.post<Poruka>(this.uri + "/promeniLozinkuNeZnamStaru", data);
  }

  dohvBezbPitanje(kor_ime: string) {
    const data = {
      kor_ime: kor_ime
    };
    return this.http.post<Poruka>(this.uri + "/dohvBezbPitanje", data);
  }

  proveriBezbOdgovor(kor_ime: string, bezb_odgovor: string) {
    const data = {
      kor_ime: kor_ime,
      bezb_odgovor: bezb_odgovor
    };
    return this.http.post<boolean>(this.uri + "/proveriBezbOdgovor", data);
  }

  dohvUkupanBrojUcenika() {
    return this.http.get<number>(this.uri + "/dohvUkupanBrojUcenika");
  }

  dohvUkupanBrojAktivnihNastavnika() {
    return this.http.get<number>(this.uri + "/dohvUkupanBrojAktivnihNastavnika");
  }

  dohvBrojOdrzanihCasovaPrethNedelja() {
    return this.http.get<number>(this.uri + "/dohvBrojOdrzanihCasovaPrethNedelja");
  }

  dohvBrojOdrzanihCasovaPrethMesec() {
    return this.http.get<number>(this.uri + "/dohvBrojOdrzanihCasovaPrethMesec");
  }

  dohvPredmete() {
    return this.http.get<Predmet[]>(this.uri + "/dohvPredmete");
  }

  dohvAngazovaneNastavnike(predmet: string) {
    const data = {
      predmet: predmet
    };
    return this.http.post<Korisnik[]>(this.uri + "/dohvAngazovaneNastavnike", data);
  }

  dohvAngazovaneNastavnikeExt(predmet: string, uzrast: string) {
    const data = {
      predmet: predmet,
      uzrast: uzrast
    };
    return this.http.post<Korisnik[]>(this.uri + "/dohvAngazovaneNastavnikeExt", data);
  }

  azurirajIme(kor_ime: string, ime: string) {
    const data = {
      kor_ime: kor_ime,
      ime: ime
    };
    return this.http.post<Poruka>(this.uri + "/azurirajIme", data);
  }

  azurirajPrezime(kor_ime: string, prezime: string) {
    const data = {
      kor_ime: kor_ime,
      prezime: prezime
    };
    return this.http.post<Poruka>(this.uri + "/azurirajPrezime", data);
  }

  azurirajAdresu(kor_ime: string, adresa: string) {
    const data = {
      kor_ime: kor_ime,
      adresa: adresa
    };
    return this.http.post<Poruka>(this.uri + "/azurirajAdresu", data);
  }

  azurirajEmail(kor_ime: string, email: string) {
    const data = {
      kor_ime: kor_ime,
      email: email
    };
    return this.http.post<Poruka>(this.uri + "/azurirajEmail", data);
  }

  azurirajTelefon(kor_ime: string, telefon: string) {
    const data = {
      kor_ime: kor_ime,
      telefon: telefon
    };
    return this.http.post<Poruka>(this.uri + "/azurirajTelefon", data);
  }

  azurirajTrRazred(kor_ime: string, tip_skole: string) {
    const data = {
      kor_ime: kor_ime,
      tip_skole: tip_skole
    };
    return this.http.post<Poruka>(this.uri + "/azurirajTrRazred", data);
  }

  azurirajProfSliku(kor_ime: string, prof_slika: string) {
    const data = {
      kor_ime: kor_ime,
      prof_slika: prof_slika
    };
    return this.http.post<Poruka>(this.uri + "/azurirajProfSliku", data);
  }

  azurirajPredmete(kor_ime: string, predmeti: string[]) {
    const data = {
      kor_ime: kor_ime,
      predmeti: predmeti
    };
    return this.http.post<Poruka>(this.uri + "/azurirajPredmete", data);
  }

  azurirajUzraste(kor_ime: string, uzrasti: string[]) {
    const data = {
      kor_ime: kor_ime,
      uzrasti: uzrasti
    };
    return this.http.post<Poruka>(this.uri + "/azurirajUzraste", data);
  }

  dohvCasoveNastavnika(nastavnik: string) {
    const data = {
      nastavnik: nastavnik
    };
    return this.http.post<Cas[]>(this.uri + "/dohvCasoveNastavnika", data);
  }

  dohvCasoveUcenika(ucenik: string) {
    const data = {
      ucenik: ucenik
    };
    return this.http.post<Cas[]>(this.uri + "/dohvCasoveUcenika", data);
  }

  zakaziCas(ucenik: string, nastavnik: string, predmet: string, datum_vreme_start: string, kratak_opis: string, dupli_cas: boolean, trajanje: number) {
    const data = {
      ucenik: ucenik,
      nastavnik: nastavnik,
      predmet: predmet,
      datum_vreme_start: datum_vreme_start,
      kratak_opis: kratak_opis,
      dupli_cas: dupli_cas,
      trajanje: trajanje
    };
    return this.http.post<Poruka>(this.uri + "/zakaziCas", data);
  }

  zakaziCasExt(ucenik: string, nastavnik: string, predmet: string, datum_vreme_start: string, datum_vreme_kraj: string, kratak_opis: string) {
    const data = {
      ucenik: ucenik,
      nastavnik: nastavnik,
      predmet: predmet,
      datum_vreme_start: datum_vreme_start,
      datum_vreme_kraj: datum_vreme_kraj,
      kratak_opis: kratak_opis
    };
    return this.http.post<Poruka>(this.uri + "/zakaziCasExt", data);
  }

  potvrdiCas(_id: string) {
    const data = {
      _id: _id
    };
    return this.http.post<Poruka>(this.uri + "/potvrdiCas", data);
  }

  odbijCas(_id: string, tekst: string) {
    const data = {
      _id: _id,
      tekst: tekst
    };
    return this.http.post<Poruka>(this.uri + "/odbijCas", data);
  }

  unesiKomentarIOcenuUcenik(_id: string, komentar_ucenik: string, ocena_ucenik: number) {
    const data = {
      _id: _id,
      komentar_ucenik: komentar_ucenik,
      ocena_ucenik: ocena_ucenik
    };
    return this.http.post<Poruka>(this.uri + "/unesiKomentarIOcenuUcenik", data);
  }

  unesiKomentarIOcenuNastavnik(_id: string, komentar_nastavnik: string, ocena_nastavnik: number) {
    const data = {
      _id: _id,
      komentar_nastavnik: komentar_nastavnik,
      ocena_nastavnik: ocena_nastavnik
    };
    return this.http.post<Poruka>(this.uri + "/unesiKomentarIOcenuNastavnik", data);
  }

  dohvObavestenjaZaCas(cas: string) {
    const data = {
      cas: cas
    };
    return this.http.post<Obavestenje[]>(this.uri + "/dohvObavestenjaZaCas", data);
  }

  kreirajObavestenje(cas: string, tekst: string) {
    const data = {
      cas: cas,
      tekst: tekst
    };
    return this.http.post<Poruka>(this.uri + "/kreirajObavestenje", data);
  }

  procitajObavestenje(_id: string) {
    const data = {
      _id: _id
    };
    return this.http.post<Poruka>(this.uri + "/procitajObavestenje", data);
  }

  dohvSveCasoveVremenskiPeriod(nastavnik: string, brojDana: number) {
    const data = {
      nastavnik: nastavnik,
      brojDana: brojDana
    };
    return this.http.post<Cas[]>(this.uri + "/dohvSveCasoveVremenskiPeriod", data);
  }

  dodajNedostupnost(nastavnik: string, datum_vreme_start: string, datum_vreme_kraj: string) {
    const data = {
      nastavnik: nastavnik,
      datum_vreme_start: datum_vreme_start,
      datum_vreme_kraj: datum_vreme_kraj
    };
    return this.http.post<Poruka>(this.uri + "/dodajNedostupnost", data);
  }

  dodajNedostupnostExt(nastavnik: string, datum_vreme_start: string, datum_vreme_kraj: string) {
    const data = {
      nastavnik: nastavnik,
      datum_vreme_start: datum_vreme_start,
      datum_vreme_kraj: datum_vreme_kraj
    };
    return this.http.post<Poruka>(this.uri + "/dodajNedostupnostExt", data);
  }

  dohvCasoveUcenikNastavnik(ucenik: string, nastavnik: string) {
    const data = {
      ucenik: ucenik,
      nastavnik: nastavnik
    };
    return this.http.post<Cas[]>(this.uri + "/dohvCasoveUcenikNastavnik", data);
  }

  dohvBrAngazovanihNastavnikaPredmet(predmet: string) {
    const data = {
      predmet: predmet
    };
    return this.http.post<number>(this.uri + "/dohvBrAngazovanihNastavnikaPredmet", data);
  }

  dohvBrAngazovanihNastavnikaUzrast(uzrast: string) {
    const data = {
      uzrast: uzrast
    };
    return this.http.post<number>(this.uri + "/dohvBrAngazovanihNastavnikaUzrast", data);
  }

  dohvBrLjudiPol(tip: string, pol: string) {
    const data = {
      tip: tip,
      pol: pol
    };
    return this.http.post<number>(this.uri + "/dohvBrLjudiPol", data);
  }

  dohvSveNastavnike() {
    return this.http.get<Korisnik[]>(this.uri + "/dohvSveNastavnike");
  }

  dohvSveUcenike() {
    return this.http.get<Korisnik[]>(this.uri + "/dohvSveUcenike");
  }

  dohvBrojCasovaNastavnikMesec2023(nastavnik: string) {
    const data = {
      nastavnik: nastavnik
    };
    return this.http.post<number[]>(this.uri + "/dohvBrojCasovaNastavnikMesec2023", data);
  }

  dohvBrojCasovaNastavnikDan2023(nastavnik: string) {
    const data = {
      nastavnik: nastavnik
    };
    return this.http.post<number[]>(this.uri + "/dohvBrojCasovaNastavnikDan2023", data);
  }

  dohvSveCasove() {
    return this.http.get<Cas[]>(this.uri + "/dohvSveCasove");
  }

  dohvUkupanBrKorisnika() {
    return this.http.get<number>(this.uri + "/dohvUkupanBrKorisnika");
  }

  dohvBrBezProfilne() {
    return this.http.get<number>(this.uri + "/dohvBrBezProfilne");
  }

  dohvSvePredmete() {
    return this.http.get<Predmet[]>(this.uri + "/dohvSvePredmete");
  }

  odbijPredmet(predmet: string) {
    const data = {
      predmet: predmet
    };
    return this.http.post<Poruka>(this.uri + "/odbijPredmet", data);
  }

  azurirajBezbPitanjeOdgovor(kor_ime: string, bezb_pitanje: string, bezb_odgovor: string) {
    const data = {
      kor_ime: kor_ime,
      bezb_pitanje: bezb_pitanje,
      bezb_odgovor: bezb_odgovor
    };
    return this.http.post<Poruka>(this.uri + "/azurirajBezbPitanjeOdgovor", data);
  }

  proveriJedinstvenMejl(email: string) {
    const data = {
      email: email
    };
    return this.http.post<Korisnik>(this.uri + "/proveriJedinstvenMejl", data);
  }

}
