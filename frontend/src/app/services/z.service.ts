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
}
