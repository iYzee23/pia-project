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
    .route("/dohvCasoveNastavnika")
    .post((req, res) => new controller_1.ZController().dohvCasoveNastavnika(req, res));
ZRouter
    .route("/zakaziCas")
    .post((req, res) => new controller_1.ZController().zakaziCas(req, res));
exports.default = ZRouter;
