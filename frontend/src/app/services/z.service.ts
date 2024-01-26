import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Admin } from '../models/admin';
import { Cas } from '../models/cas';
import { Nastavnik } from '../models/nastavnik';
import { Obavestenje } from '../models/obavestenje';
import { Predmet } from '../models/predmet';
import { Ucenik } from '../models/ucenik';

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
}
