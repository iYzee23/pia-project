"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const ZRouter = express_1.default.Router();
ZRouter
    .route("/login")
    .post((req, res) => new controller_1.ZController().login(req, res));
ZRouter
    .route("/loginAdmin")
    .post((req, res) => new controller_1.ZController().loginAdmin(req, res));
ZRouter
    .route("/dohvKorisnika")
    .post((req, res) => new controller_1.ZController().dohvKorisnika(req, res));
ZRouter
    .route("/dohvUcenika")
    .post((req, res) => new controller_1.ZController().dohvUcenika(req, res));
ZRouter
    .route("/dohvNastavnika")
    .post((req, res) => new controller_1.ZController().dohvNastavnika(req, res));
ZRouter
    .route("/registracijaUcenik")
    .post((req, res) => new controller_1.ZController().registracijaUcenik(req, res));
ZRouter
    .route("/registracijaNastavnik")
    .post((req, res) => new controller_1.ZController().registracijaNastavnik(req, res));
ZRouter
    .route("/prihvatiNastavnika")
    .post((req, res) => new controller_1.ZController().prihvatiNastavnika(req, res));
ZRouter
    .route("/odbijNastavnika")
    .post((req, res) => new controller_1.ZController().odbijNastavnika(req, res));
ZRouter
    .route("/predloziPredmete")
    .post((req, res) => new controller_1.ZController().predloziPredmete(req, res));
ZRouter
    .route("/prihvatiPredmet")
    .post((req, res) => new controller_1.ZController().prihvatiPredmet(req, res));
ZRouter
    .route("/dodajPredmet")
    .post((req, res) => new controller_1.ZController().dodajPredmet(req, res));
ZRouter
    .route("/promeniLozinkuZnamStaru")
    .post((req, res) => new controller_1.ZController().promeniLozinkuZnamStaru(req, res));
ZRouter
    .route("/promeniLozinkuNeZnamStaru")
    .post((req, res) => new controller_1.ZController().promeniLozinkuNeZnamStaru(req, res));
ZRouter
    .route("/dohvBezbPitanje")
    .post((req, res) => new controller_1.ZController().dohvBezbPitanje(req, res));
ZRouter
    .route("/proveriBezbOdgovor")
    .post((req, res) => new controller_1.ZController().proveriBezbOdgovor(req, res));
ZRouter
    .route("/dohvUkupanBrojUcenika")
    .get((req, res) => new controller_1.ZController().dohvUkupanBrojUcenika(req, res));
ZRouter
    .route("/dohvUkupanBrojAktivnihNastavnika")
    .get((req, res) => new controller_1.ZController().dohvUkupanBrojAktivnihNastavnika(req, res));
ZRouter
    .route("/dohvBrojOdrzanihCasovaPrethNedelja")
    .get((req, res) => new controller_1.ZController().dohvBrojOdrzanihCasovaPrethNedelja(req, res));
ZRouter
    .route("/dohvBrojOdrzanihCasovaPrethMesec")
    .get((req, res) => new controller_1.ZController().dohvBrojOdrzanihCasovaPrethMesec(req, res));
ZRouter
    .route("/dohvPredmete")
    .get((req, res) => new controller_1.ZController().dohvPredmete(req, res));
ZRouter
    .route("/dohvAngazovaneNastavnike")
    .post((req, res) => new controller_1.ZController().dohvAngazovaneNastavnike(req, res));
ZRouter
    .route("/dohvAngazovaneNastavnikeExt")
    .post((req, res) => new controller_1.ZController().dohvAngazovaneNastavnikeExt(req, res));
ZRouter
    .route("/azurirajIme")
    .post((req, res) => new controller_1.ZController().azurirajIme(req, res));
ZRouter
    .route("/azurirajPrezime")
    .post((req, res) => new controller_1.ZController().azurirajPrezime(req, res));
ZRouter
    .route("/azurirajAdresu")
    .post((req, res) => new controller_1.ZController().azurirajAdresu(req, res));
ZRouter
    .route("/azurirajEmail")
    .post((req, res) => new controller_1.ZController().azurirajEmail(req, res));
ZRouter
    .route("/azurirajTelefon")
    .post((req, res) => new controller_1.ZController().azurirajTelefon(req, res));
ZRouter
    .route("/azurirajTrRazred")
    .post((req, res) => new controller_1.ZController().azurirajTrRazred(req, res));
ZRouter
    .route("/azurirajProfSliku")
    .post((req, res) => new controller_1.ZController().azurirajProfSliku(req, res));
ZRouter
    .route("/azurirajPredmete")
    .post((req, res) => new controller_1.ZController().azurirajPredmete(req, res));
ZRouter
    .route("/azurirajUzraste")
    .post((req, res) => new controller_1.ZController().azurirajUzraste(req, res));
ZRouter
    .route("/dohvCasoveNastavnika")
    .post((req, res) => new controller_1.ZController().dohvCasoveNastavnika(req, res));
ZRouter
    .route("/dohvCasoveUcenika")
    .post((req, res) => new controller_1.ZController().dohvCasoveUcenika(req, res));
ZRouter
    .route("/zakaziCas")
    .post((req, res) => new controller_1.ZController().zakaziCas(req, res));
ZRouter
    .route("/zakaziCasExt")
    .post((req, res) => new controller_1.ZController().zakaziCasExt(req, res));
ZRouter
    .route("/potvrdiCas")
    .post((req, res) => new controller_1.ZController().potvrdiCas(req, res));
ZRouter
    .route("/odbijCas")
    .post((req, res) => new controller_1.ZController().odbijCas(req, res));
ZRouter
    .route("/unesiKomentarIOcenuUcenik")
    .post((req, res) => new controller_1.ZController().unesiKomentarIOcenuUcenik(req, res));
ZRouter
    .route("/unesiKomentarIOcenuNastavnik")
    .post((req, res) => new controller_1.ZController().unesiKomentarIOcenuNastavnik(req, res));
ZRouter
    .route("/dohvObavestenjaZaCas")
    .post((req, res) => new controller_1.ZController().dohvObavestenjaZaCas(req, res));
ZRouter
    .route("/kreirajObavestenje")
    .post((req, res) => new controller_1.ZController().kreirajObavestenje(req, res));
ZRouter
    .route("/procitajObavestenje")
    .post((req, res) => new controller_1.ZController().procitajObavestenje(req, res));
ZRouter
    .route("/dohvSveCasoveVremenskiPeriod")
    .post((req, res) => new controller_1.ZController().dohvSveCasoveVremenskiPeriod(req, res));
ZRouter
    .route("/dodajNedostupnost")
    .post((req, res) => new controller_1.ZController().dodajNedostupnost(req, res));
ZRouter
    .route("/dodajNedostupnostExt")
    .post((req, res) => new controller_1.ZController().dodajNedostupnostExt(req, res));
ZRouter
    .route("/dohvCasoveUcenikNastavnik")
    .post((req, res) => new controller_1.ZController().dohvCasoveUcenikNastavnik(req, res));
ZRouter
    .route("/dohvBrAngazovanihNastavnikaPredmet")
    .post((req, res) => new controller_1.ZController().dohvBrAngazovanihNastavnikaPredmet(req, res));
ZRouter
    .route("/dohvBrAngazovanihNastavnikaUzrast")
    .post((req, res) => new controller_1.ZController().dohvBrAngazovanihNastavnikaUzrast(req, res));
ZRouter
    .route("/dohvBrLjudiPol")
    .post((req, res) => new controller_1.ZController().dohvBrLjudiPol(req, res));
ZRouter
    .route("/dohvSveNastavnike")
    .get((req, res) => new controller_1.ZController().dohvSveNastavnike(req, res));
ZRouter
    .route("/dohvSveUcenike")
    .get((req, res) => new controller_1.ZController().dohvSveUcenike(req, res));
ZRouter
    .route("/dohvBrojCasovaNastavnikMesec2023")
    .post((req, res) => new controller_1.ZController().dohvBrojCasovaNastavnikMesec2023(req, res));
ZRouter
    .route("/dohvBrojCasovaNastavnikDan2023")
    .post((req, res) => new controller_1.ZController().dohvBrojCasovaNastavnikDan2023(req, res));
ZRouter
    .route("/dohvSveCasove")
    .get((req, res) => new controller_1.ZController().dohvSveCasove(req, res));
ZRouter
    .route("/dohvUkupanBrKorisnika")
    .get((req, res) => new controller_1.ZController().dohvUkupanBrKorisnika(req, res));
ZRouter
    .route("/dohvBrBezProfilne")
    .get((req, res) => new controller_1.ZController().dohvBrBezProfilne(req, res));
ZRouter
    .route("/dohvSvePredmete")
    .get((req, res) => new controller_1.ZController().dohvSvePredmete(req, res));
ZRouter
    .route("/odbijPredmet")
    .post((req, res) => new controller_1.ZController().odbijPredmet(req, res));
ZRouter
    .route("/azurirajBezbPitanjeOdgovor")
    .post((req, res) => new controller_1.ZController().azurirajBezbPitanjeOdgovor(req, res));
ZRouter
    .route("/proveriJedinstvenMejl")
    .post((req, res) => new controller_1.ZController().proveriJedinstvenMejl(req, res));
exports.default = ZRouter;
