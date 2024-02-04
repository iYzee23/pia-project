import express from "express";
import { ZController } from "./controller";

const ZRouter = express.Router();

ZRouter
    .route("/login")
    .post((req, res) => new ZController().login(req, res));

ZRouter
    .route("/loginAdmin")
    .post((req, res) => new ZController().loginAdmin(req, res));

ZRouter
    .route("/dohvKorisnika")
    .post((req, res) => new ZController().dohvKorisnika(req, res));

ZRouter
    .route("/dohvUcenika")
    .post((req, res) => new ZController().dohvUcenika(req, res));

ZRouter
    .route("/dohvNastavnika")
    .post((req, res) => new ZController().dohvNastavnika(req, res));

ZRouter
    .route("/registracijaUcenik")
    .post((req, res) => new ZController().registracijaUcenik(req, res));

ZRouter
    .route("/registracijaNastavnik")
    .post((req, res) => new ZController().registracijaNastavnik(req, res));

ZRouter
    .route("/prihvatiNastavnika")
    .post((req, res) => new ZController().prihvatiNastavnika(req, res));

ZRouter
    .route("/odbijNastavnika")
    .post((req, res) => new ZController().odbijNastavnika(req, res));

ZRouter
    .route("/predloziPredmete")
    .post((req, res) => new ZController().predloziPredmete(req, res));

ZRouter
    .route("/prihvatiPredmet")
    .post((req, res) => new ZController().prihvatiPredmet(req, res));

ZRouter
    .route("/dodajPredmet")
    .post((req, res) => new ZController().dodajPredmet(req, res));

ZRouter
    .route("/promeniLozinkuZnamStaru")
    .post((req, res) => new ZController().promeniLozinkuZnamStaru(req, res));

ZRouter
    .route("/promeniLozinkuNeZnamStaru")
    .post((req, res) => new ZController().promeniLozinkuNeZnamStaru(req, res));

ZRouter
    .route("/dohvBezbPitanje")
    .post((req, res) => new ZController().dohvBezbPitanje(req, res));

ZRouter
    .route("/proveriBezbOdgovor")
    .post((req, res) => new ZController().proveriBezbOdgovor(req, res));

ZRouter
    .route("/dohvUkupanBrojUcenika")
    .get((req, res) => new ZController().dohvUkupanBrojUcenika(req, res));

ZRouter
    .route("/dohvUkupanBrojAktivnihNastavnika")
    .get((req, res) => new ZController().dohvUkupanBrojAktivnihNastavnika(req, res));

ZRouter
    .route("/dohvBrojOdrzanihCasovaPrethNedelja")
    .get((req, res) => new ZController().dohvBrojOdrzanihCasovaPrethNedelja(req, res));

ZRouter
    .route("/dohvBrojOdrzanihCasovaPrethMesec")
    .get((req, res) => new ZController().dohvBrojOdrzanihCasovaPrethMesec(req, res));

ZRouter
    .route("/dohvPredmete")
    .get((req, res) => new ZController().dohvPredmete(req, res));

ZRouter
    .route("/dohvAngazovaneNastavnike")
    .post((req, res) => new ZController().dohvAngazovaneNastavnike(req, res));

ZRouter
    .route("/dohvAngazovaneNastavnikeExt")
    .post((req, res) => new ZController().dohvAngazovaneNastavnikeExt(req, res));

ZRouter
    .route("/azurirajIme")
    .post((req, res) => new ZController().azurirajIme(req, res));

ZRouter
    .route("/azurirajPrezime")
    .post((req, res) => new ZController().azurirajPrezime(req, res));

ZRouter
    .route("/azurirajAdresu")
    .post((req, res) => new ZController().azurirajAdresu(req, res));

ZRouter
    .route("/azurirajEmail")
    .post((req, res) => new ZController().azurirajEmail(req, res));

ZRouter
    .route("/azurirajTelefon")
    .post((req, res) => new ZController().azurirajTelefon(req, res));

ZRouter
    .route("/azurirajTrRazred")
    .post((req, res) => new ZController().azurirajTrRazred(req, res));

ZRouter
    .route("/azurirajProfSliku")
    .post((req, res) => new ZController().azurirajProfSliku(req, res));

ZRouter
    .route("/dohvCasoveNastavnika")
    .post((req, res) => new ZController().dohvCasoveNastavnika(req, res));

ZRouter
    .route("/zakaziCas")
    .post((req, res) => new ZController().zakaziCas(req, res));

ZRouter
    .route("/zakaziCasExt")
    .post((req, res) => new ZController().zakaziCasExt(req, res));

export default ZRouter;