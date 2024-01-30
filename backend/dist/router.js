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
exports.default = ZRouter;
