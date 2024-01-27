"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZController = void 0;
const cryption_1 = require("./cryption");
const korisnik_1 = __importDefault(require("./models/korisnik"));
const ucenik_1 = __importDefault(require("./models/ucenik"));
const nastavnik_1 = __importDefault(require("./models/nastavnik"));
const predmet_1 = __importDefault(require("./models/predmet"));
class ZController {
    constructor() {
        this.login = (req, res) => {
            const kor_ime = req.body.kor_ime;
            const lozinka = req.body.lozinka;
            const tip = req.body.tip;
            korisnik_1.default
                .findOne({ kor_ime: kor_ime, tip: tip, zahtev_status: "Prihvacen" })
                .then(data1 => {
                if (!data1)
                    return res.json(null);
                (0, cryption_1.verifyPassword)(lozinka, data1.lozinka)
                    .then(data2 => {
                    if (data2)
                        return res.json(data1);
                    else
                        return res.json(null);
                })
                    .catch(err2 => console.log(err2));
            })
                .catch(err1 => console.log(err1));
        };
        this.loginAdmin = (req, res) => {
            const kor_ime = req.body.kor_ime;
            const lozinka = req.body.lozinka;
            korisnik_1.default
                .findOne({ kor_ime: kor_ime, tip: "Admin", zahtev_status: "Prihvacen" })
                .then(data1 => {
                if (!data1)
                    return res.json(null);
                (0, cryption_1.verifyPassword)(lozinka, data1.lozinka)
                    .then(data2 => {
                    if (data2)
                        return res.json(data1);
                    else
                        return res.json(null);
                })
                    .catch(err2 => console.log(err2));
            })
                .catch(err1 => console.log(err1));
        };
        this.dohvKorisnika = (req, res) => {
            const kor_ime = req.body.kor_ime;
            korisnik_1.default
                .findOne({ kor_ime: kor_ime })
                .then(data => res.json(data))
                .catch(err => console.log(err));
        };
        this.dohvUcenika = (req, res) => {
            const kor_ime = req.body.kor_ime;
            ucenik_1.default
                .findOne({ kor_ime: kor_ime })
                .then(data => res.json(data))
                .catch(err => console.log(err));
        };
        this.dohvNastavnika = (req, res) => {
            const kor_ime = req.body.kor_ime;
            nastavnik_1.default
                .findOne({ kor_ime: kor_ime })
                .then(data => res.json(data))
                .catch(err => console.log(err));
        };
        this.registracijaUcenik = (req, res) => {
            const kor_ime = req.body.kor_ime;
            korisnik_1.default
                .findOne({ kor_ime: kor_ime })
                .then(data1 => {
                if (data1)
                    return res.json({ msg: "Niste uneli jedinstveno korisnicko ime." });
                const email = req.body.email;
                korisnik_1.default
                    .findOne({ email: email })
                    .then(data2 => {
                    if (data2)
                        return res.json({ msg: "Niste uneli jedinstven mejl." });
                    const lozinka = req.body.lozinka;
                    (0, cryption_1.hashPassword)(lozinka)
                        .then(data3 => {
                        const nKorisnik = new korisnik_1.default({
                            kor_ime: kor_ime,
                            lozinka: data3,
                            tip: "Ucenik",
                            bezb_pitanje: req.body.bezb_pitanje,
                            bezb_odgovor: req.body.bezb_odgovor,
                            ime: req.body.ime,
                            prezime: req.body.prezime,
                            pol: req.body.pol,
                            adresa: req.body.adresa,
                            telefon: req.body.telefon,
                            email: email,
                            prof_slika: req.body.prof_slika,
                            zahtev_status: "Prihvacen"
                        });
                        nKorisnik
                            .save()
                            .then(data4 => {
                            const nUcenik = new ucenik_1.default({
                                kor_ime: kor_ime,
                                tip_skole: req.body.tip_skole,
                                tr_razred: req.body.tr_razred,
                                ocena: 0.00,
                                br_ocena: 0
                            });
                            nUcenik
                                .save()
                                .then(data5 => res.json({ msg: "OK" }))
                                .catch(err5 => console.log(err5));
                        })
                            .catch(err4 => console.log(err4));
                    })
                        .catch(err3 => console.log(err3));
                })
                    .catch(err2 => console.log(err2));
            })
                .catch(err1 => console.log(err1));
        };
        this.registracijaNastavnik = (req, res) => {
            const kor_ime = req.body.kor_ime;
            korisnik_1.default
                .findOne({ kor_ime: kor_ime })
                .then(data1 => {
                if (data1)
                    return res.json({ msg: "Niste uneli jedinstveno korisnicko ime." });
                const email = req.body.email;
                korisnik_1.default
                    .findOne({ email: email })
                    .then(data2 => {
                    if (data2)
                        return res.json({ msg: "Niste uneli jedinstven mejl." });
                    const lozinka = req.body.lozinka;
                    (0, cryption_1.hashPassword)(lozinka)
                        .then(data3 => {
                        const nKorisnik = new korisnik_1.default({
                            kor_ime: kor_ime,
                            lozinka: data3,
                            tip: "Nastavnik",
                            bezb_pitanje: req.body.bezb_pitanje,
                            bezb_odgovor: req.body.bezb_odgovor,
                            ime: req.body.ime,
                            prezime: req.body.prezime,
                            pol: req.body.pol,
                            adresa: req.body.adresa,
                            telefon: req.body.telefon,
                            email: email,
                            prof_slika: req.body.prof_slika,
                            zahtev_status: "U obradi"
                        });
                        nKorisnik
                            .save()
                            .then(data4 => {
                            const nNastavnik = new nastavnik_1.default({
                                kor_ime: kor_ime,
                                cv_pdf: req.body.cv_pdf,
                                // ovo ce morati da se filtrira po adminovom neodobravanju
                                // slobodna forma: clanovi niza su razdvojeni zarezom
                                predmeti: req.body.predmeti,
                                uzrast: req.body.uzrast,
                                culi_sajt: req.body.culi_sajt,
                                dostupnost: [],
                                ocena: 0.00,
                                br_ocena: 0
                            });
                            nNastavnik
                                .save()
                                .then(data5 => res.json({ msg: "OK" }))
                                .catch(err5 => console.log(err5));
                        })
                            .catch(err4 => console.log(err4));
                    })
                        .catch(err3 => console.log(err3));
                })
                    .catch(err2 => console.log(err2));
            })
                .catch(err1 => console.log(err1));
        };
        this.prihvatiNastavnika = (req, res) => {
            const kor_ime = req.body.kor_ime;
            korisnik_1.default
                .findOneAndUpdate({ kor_ime: kor_ime, tip: "Nastavnik" }, { zahtev_status: "Prihvacen" })
                .then(data => res.json({ msg: "OK" }))
                .catch(err => console.log(err));
        };
        this.odbijNastavnika = (req, res) => {
            const kor_ime = req.body.kor_ime;
            korisnik_1.default
                .findOneAndUpdate({ kor_ime: kor_ime, tip: "Nastavnik" }, { zahtev_status: "Odbijen" })
                .then(data => res.json({ msg: "OK" }))
                .catch(err => console.log(err));
        };
        this.predloziPredmete = (req, res) => {
            const predmeti = req.body.predmeti;
            let cnt = predmeti.length;
            for (let pr of predmeti) {
                predmet_1.default
                    .findOne({ naziv: pr })
                    .then(data => {
                    if (!data) {
                        const nPredmet = new predmet_1.default({
                            naziv: pr,
                            status: "U obradi"
                        });
                        nPredmet
                            .save()
                            .then(tData => {
                            --cnt;
                            if (cnt == 0)
                                return res.json({ msg: "OK" });
                        })
                            .catch(tErr => console.log(tErr));
                    }
                    else {
                        --cnt;
                        if (cnt == 0)
                            return res.json({ msg: "OK" });
                    }
                })
                    .catch(err => console.log(err));
            }
        };
        this.prihvatiPredmet = (req, res) => {
            const naziv = req.body.naziv;
            predmet_1.default
                .findOneAndUpdate({ naziv: naziv }, { status: "Prihvacen" })
                .then(data => res.json({ msg: "OK" }))
                .catch(err => console.log(err));
        };
        this.dodajPredmet = (req, res) => {
            const nPredmet = new predmet_1.default({
                naziv: req.body.naziv,
                status: "Prihvacen"
            });
            nPredmet
                .save()
                .then(data => res.json({ msg: "OK" }))
                .catch(err => console.log(err));
        };
        this.promeniLozinkuZnamStaru = (req, res) => {
            const kor_ime = req.body.kor_ime;
            const staraLozinka = req.body.staraLozinka;
            const novaLozinka = req.body.novaLozinka;
            korisnik_1.default
                .findOne({ kor_ime: kor_ime })
                .then(data1 => {
                (0, cryption_1.verifyPassword)(staraLozinka, data1.lozinka)
                    .then(data2 => {
                    if (!data2)
                        return res.json({ msg: "Neispravna stara lozinka." });
                    (0, cryption_1.hashPassword)(novaLozinka)
                        .then(data3 => {
                        korisnik_1.default
                            .findByIdAndUpdate({ kor_ime: kor_ime }, { lozinka: data3 })
                            .then(data4 => res.json({ msg: "OK" }))
                            .catch(err4 => console.log(err4));
                    })
                        .catch(err3 => console.log(err3));
                })
                    .catch(err2 => console.log(err2));
            })
                .catch(err1 => console.log(err1));
        };
        this.promeniLozinkuNeZnamStaru = (req, res) => {
            const kor_ime = req.body.kor_ime;
            const novaLozinka = req.body.novaLozinka;
            (0, cryption_1.hashPassword)(novaLozinka)
                .then(data => {
                korisnik_1.default
                    .findByIdAndUpdate({ kor_ime: kor_ime }, { lozinka: data })
                    .then(tData => res.json({ msg: "OK" }))
                    .catch(tErr => console.log(tErr));
            })
                .catch(err => console.log(err));
        };
        this.dohvBezbPitanje = (req, res) => {
            const kor_ime = req.body.kor_ime;
            korisnik_1.default
                .findOne({ kor_ime: kor_ime })
                .then(data => res.json({ msg: data.bezb_pitanje }))
                .catch(err => console.log(err));
        };
        this.proveriBezbOdgovor = (req, res) => {
            const kor_ime = req.body.kor_ime;
            const bezb_odgovor = req.body.bezb_odgovor;
            korisnik_1.default
                .findOne({ kor_ime: kor_ime, bezb_odgovor: bezb_odgovor })
                .then(data => res.json(data != null))
                .catch(err => console.log(err));
        };
    }
}
exports.ZController = ZController;
