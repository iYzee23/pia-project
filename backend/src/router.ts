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

export default ZRouter;