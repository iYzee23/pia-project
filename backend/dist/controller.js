"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZController = void 0;
const Util = __importStar(require("./util"));
const korisnik_1 = __importDefault(require("./models/korisnik"));
const ucenik_1 = __importDefault(require("./models/ucenik"));
const nastavnik_1 = __importDefault(require("./models/nastavnik"));
const cas_1 = __importDefault(require("./models/cas"));
const predmet_1 = __importDefault(require("./models/predmet"));
const obavestenje_1 = __importDefault(require("./models/obavestenje"));
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
                Util.verifyPassword(lozinka, data1.lozinka)
                    .then(data2 => {
                    if (data2) {
                        data1.prof_slika = Util.loadPicture(data1.prof_slika);
                        return res.json(data1);
                    }
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
                Util.verifyPassword(lozinka, data1.lozinka)
                    .then(data2 => {
                    if (data2) {
                        data1.prof_slika = Util.loadPicture(data1.prof_slika);
                        return res.json(data1);
                    }
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
                .then(data => {
                if (data)
                    data.prof_slika = Util.loadPicture(data.prof_slika);
                res.json(data);
            })
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
                .then(data => {
                if (data)
                    data.cv_pdf = Util.loadPdf(data.cv_pdf);
                res.json(data);
            })
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
                    Util.hashPassword(lozinka)
                        .then(data3 => {
                        const prof_path = Util.savePicture(req.body.prof_slika);
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
                            prof_slika: prof_path,
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
        /*
            predmeti nastavnika ce morati da se filtriraju po adminovom neodobravanju
            --> takodje, posto inicijalno prikazujemo i neprihvacene predmete nastavnika
            --> neki ucenik kod njega moze da zakaze cas iz ovakvog predmeta
            --> zato, ukoliko admin odbije predmet, mi cemo da otkazemo taj cas i posaljemo obavestenje
            slobodna forma: clanovi niza su razdvojeni zarezom
        */
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
                    Util.hashPassword(lozinka)
                        .then(data3 => {
                        const prof_path = Util.savePicture(req.body.prof_slika);
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
                            prof_slika: prof_path,
                            zahtev_status: "U obradi"
                        });
                        nKorisnik
                            .save()
                            .then(data4 => {
                            const cv_path = Util.savePdf(req.body.cv_pdf);
                            const nNastavnik = new nastavnik_1.default({
                                kor_ime: kor_ime,
                                cv_pdf: cv_path,
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
            const naziv = req.body.naziv;
            predmet_1.default
                .findOne({ naziv: naziv })
                .then(data => {
                if (!data) {
                    const nPredmet = new predmet_1.default({
                        naziv: naziv,
                        status: "Prihvacen"
                    });
                    nPredmet
                        .save()
                        .then(tData => res.json({ msg: "OK" }))
                        .catch(tErr => console.log(tErr));
                }
                else {
                    predmet_1.default
                        .findOneAndUpdate({ naziv: naziv }, { status: "Prihvacen" })
                        .then(dData => res.json({ msg: "OK" }))
                        .catch(dErr => console.log(dErr));
                }
            })
                .catch(err => console.log(err));
        };
        this.promeniLozinkuZnamStaru = (req, res) => {
            const kor_ime = req.body.kor_ime;
            const staraLozinka = req.body.staraLozinka;
            const novaLozinka = req.body.novaLozinka;
            korisnik_1.default
                .findOne({ kor_ime: kor_ime })
                .then(data1 => {
                Util.verifyPassword(staraLozinka, data1.lozinka)
                    .then(data2 => {
                    if (!data2)
                        return res.json({ msg: "Neispravna stara lozinka." });
                    Util.hashPassword(novaLozinka)
                        .then(data3 => {
                        korisnik_1.default
                            .findOneAndUpdate({ kor_ime: kor_ime }, { lozinka: data3 })
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
            Util.hashPassword(novaLozinka)
                .then(data => {
                korisnik_1.default
                    .findOneAndUpdate({ kor_ime: kor_ime }, { lozinka: data })
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
        this.dohvUkupanBrojUcenika = (req, res) => {
            ucenik_1.default
                .countDocuments({})
                .then(data => res.json(data))
                .catch(err => console.log(err));
        };
        this.dohvUkupanBrojAktivnihNastavnika = (req, res) => {
            korisnik_1.default
                .countDocuments({ tip: "Nastavnik", zahtev_status: "Prihvacen" })
                .then(data => res.json(data))
                .catch(err => console.log(err));
        };
        this.dohvBrojOdrzanihCasovaPrethNedelja = (req, res) => {
            const today = new Date();
            const lastWeek = new Date();
            lastWeek.setDate(today.getDate() - 7);
            cas_1.default
                .countDocuments({ datum_vreme_start: { $gte: lastWeek.toISOString() }, status: "Prihvacen" })
                .then(data => res.json(data))
                .catch(err => console.log(err));
        };
        this.dohvBrojOdrzanihCasovaPrethMesec = (req, res) => {
            const today = new Date();
            const lastMonth = new Date();
            lastMonth.setDate(today.getDate() - 30);
            cas_1.default
                .countDocuments({ datum_vreme_start: { $gte: lastMonth.toISOString() }, status: "Prihvacen" })
                .then(data => res.json(data))
                .catch(err => console.log(err));
        };
        /*
            na frontu cemo da imamo niz struktura
            --> {predmet, imeNast, prezimeNast}[]
            
            sortiranje je onda lagano
            --> sortiramo po nekom od ovih polja unutar strukture
            
            pretraga je takodje lagana
            --> filtriramo po nekom od ovih polja unutar strukture
            
            mozemo ubaciti i sortiranje i pretragu
            --> kombinacija sortiranja i filteringa
    
            pretragu cemo takodje raditi na klik
            --> dakle, nece biti nikakvog ajaxa
    
            kod ucenika, dajemo dodadan parametar u dohvatanju angazovanih nastavnika
            --> ako se za neki predmet vrati null, samo ga necemo dodati u niz struktura
            --> potencijalno ce biti potrebno prosiriti ovu strukturu tako da imamo i prosek
        */
        this.dohvPredmete = (req, res) => {
            predmet_1.default
                .find({ status: "Prihvacen" })
                .then(data => res.json(data))
                .catch(err => console.log(err));
        };
        this.dohvAngazovaneNastavnike = (req, res) => {
            const predmet = req.body.predmet;
            nastavnik_1.default
                .find({ predmeti: { $in: [predmet] } })
                .then(data => {
                for (let nast of data)
                    nast.cv_pdf = Util.loadPdf(nast.cv_pdf);
                res.json(data);
            })
                .catch(err => console.log(err));
        };
        this.dohvAngazovaneNastavnikeExt = (req, res) => {
            const predmet = req.body.predmet;
            const uzrast = req.body.uzrast;
            nastavnik_1.default
                .find({ predmeti: { $in: [predmet] }, uzrast: { $in: [uzrast] } })
                .then(data => {
                for (let nast of data)
                    nast.cv_pdf = Util.loadPdf(nast.cv_pdf);
                res.json(data);
            })
                .catch(err => console.log(err));
        };
        this.azurirajIme = (req, res) => {
            const kor_ime = req.body.kor_ime;
            const ime = req.body.ime;
            korisnik_1.default
                .findOneAndUpdate({ kor_ime: kor_ime }, { ime: ime })
                .then(data => res.json({ msg: "OK" }))
                .catch(err => console.log(err));
        };
        this.azurirajPrezime = (req, res) => {
            const kor_ime = req.body.kor_ime;
            const prezime = req.body.prezime;
            korisnik_1.default
                .findOneAndUpdate({ kor_ime: kor_ime }, { prezime: prezime })
                .then(data => res.json({ msg: "OK" }))
                .catch(err => console.log(err));
        };
        this.azurirajAdresu = (req, res) => {
            const kor_ime = req.body.kor_ime;
            const adresa = req.body.adresa;
            korisnik_1.default
                .findOneAndUpdate({ kor_ime: kor_ime }, { adresa: adresa })
                .then(data => res.json({ msg: "OK" }))
                .catch(err => console.log(err));
        };
        this.azurirajEmail = (req, res) => {
            const kor_ime = req.body.kor_ime;
            const email = req.body.email;
            korisnik_1.default
                .findOneAndUpdate({ kor_ime: kor_ime }, { email: email })
                .then(data => res.json({ msg: "OK" }))
                .catch(err => console.log(err));
        };
        this.azurirajTelefon = (req, res) => {
            const kor_ime = req.body.kor_ime;
            const telefon = req.body.telefon;
            korisnik_1.default
                .findOneAndUpdate({ kor_ime: kor_ime }, { telefon: telefon })
                .then(data => res.json({ msg: "OK" }))
                .catch(err => console.log(err));
        };
        this.azurirajTrRazred = (req, res) => {
            const kor_ime = req.body.kor_ime;
            const tip_skole = req.body.tip_skole;
            ucenik_1.default
                .findOne({ kor_ime: kor_ime })
                .then(data => {
                const tr_razred = data.tr_razred;
                if (tr_razred === 8 && tip_skole !== "") {
                    ucenik_1.default
                        .findOneAndUpdate({ kor_ime: kor_ime }, { tr_razred: 1, tip_skole: tip_skole })
                        .then(data1 => res.json({ msg: "OK" }))
                        .catch(err1 => console.log(err1));
                }
                else {
                    ucenik_1.default
                        .findOneAndUpdate({ kor_ime: kor_ime }, { tr_razred: tr_razred + 1 })
                        .then(data2 => res.json({ msg: "OK" }))
                        .catch(err2 => console.log(err2));
                }
            })
                .catch(err => console.log(err));
        };
        this.azurirajProfSliku = (req, res) => {
            const kor_ime = req.body.kor_ime;
            const prof_slika = req.body.prof_slika;
            korisnik_1.default
                .findOne({ kor_ime: kor_ime })
                .then(data => {
                if (data.prof_slika !== Util.default_slika)
                    Util.deleteFile(data.prof_slika);
                const prof_path = prof_slika === "" ? Util.default_slika : Util.savePicture(prof_slika);
                ;
                korisnik_1.default
                    .findOneAndUpdate({ kor_ime: kor_ime }, { prof_slika: prof_path })
                    .then(tData => res.json({ msg: "OK" }))
                    .catch(tErr => console.log(tErr));
            })
                .catch(err => console.log(err));
        };
        /*
            zbog ova dva azuriranja, moci ce da nastanu neke nekonzistentne situacije
            npr, treba za 5 dana da drzim cas iz matematike, a promenio sam ovaj predmet i vise ne predajem
            ovakvi casovi ce ipak moci da se odrze
        */
        this.azurirajPredmete = (req, res) => {
            const kor_ime = req.body.kor_ime;
            const predmeti = req.body.predmeti;
            nastavnik_1.default
                .findOneAndUpdate({ kor_ime: kor_ime }, { predmeti: predmeti })
                .then(data => res.json({ msg: "OK" }))
                .catch(err => console.log(err));
        };
        this.azurirajUzraste = (req, res) => {
            const kor_ime = req.body.kor_ime;
            const uzrasti = req.body.uzrasti;
            nastavnik_1.default
                .findOneAndUpdate({ kor_ime: kor_ime }, { uzrast: uzrasti })
                .then(data => res.json({ msg: "OK" }))
                .catch(err => console.log(err));
        };
        this.dohvCasoveNastavnika = (req, res) => {
            const nastavnik = req.body.nastavnik;
            cas_1.default
                .find({ nastavnik: nastavnik })
                .then(data => res.json(data))
                .catch(err => console.log(err));
        };
        this.dohvCasoveUcenika = (req, res) => {
            const ucenik = req.body.ucenik;
            cas_1.default
                .find({ ucenik: ucenik })
                .then(data => res.json(data))
                .catch(err => console.log(err));
        };
        /*
            1)  zakazivanje casa u proslosti
            2)	zakazivanje casa vikendom
            3)	pocetak casa pre 10:00 ili kraj casa posle 18:00
            4)	u toj nedelji, nije dostupan (ponedeljak 10:00 do petka 18:00)
            5)	taj dan, nije dostupan (taj dan 10:00 do taj dan 18:00)
            6)	preklapanje (u obradi, prihvacen)
            7)  nastavnik nedostupan u datom terminu
        */
        this.zakaziCas = (req, res) => {
            const ucenik = req.body.ucenik;
            const nastavnik = req.body.nastavnik;
            const predmet = req.body.predmet;
            const datum_vreme_start = req.body.datum_vreme_start + "Z";
            const kratak_opis = req.body.kratak_opis;
            const dupli_cas = req.body.dupli_cas;
            const trajanje = req.body.trajanje;
            const datumVremeStart = new Date(datum_vreme_start);
            const datumVremeKraj = new Date(datumVremeStart.getTime() + trajanje * 60000 * (dupli_cas ? 2 : 1));
            if (!Util.proveraBuducnost(datumVremeStart))
                return res.json({ msg: "Zakazani cas mora biti u buducnosti." });
            if (Util.proveraVikend(datumVremeStart))
                return res.json({ msg: "Ne mozete zakazati cas vikendom." });
            if (Util.proveraVreme(datumVremeStart, datumVremeKraj))
                return res.json({ msg: "Ne mozete zakazati cas van radnog vremena (10:00-18:00)." });
            Util.nastavnikNedostupanNedelja(nastavnik, datumVremeStart)
                .then(data1 => {
                if (data1)
                    return res.json({ msg: "Nastavnik je zauzet citave nedelje. Izaberite drugi termin!" });
                Util.nastavnikNedostupanDan(nastavnik, datumVremeStart)
                    .then(data2 => {
                    if (data2)
                        return res.json({ msg: "Nastavnik je zauzet citav dan. Izaberite drugi termin!" });
                    Util.postojiPreklapanje(nastavnik, datumVremeStart, datumVremeKraj, "Prihvacen")
                        .then(data3 => {
                        if (data3)
                            return res.json({ msg: "Vec postoji PRIHVACEN cas koji se poklapa sa Vasim terminom. Izaberite drugi termin!" });
                        Util.postojiPreklapanje(nastavnik, datumVremeStart, datumVremeKraj, "U obradi")
                            .then(data4 => {
                            if (data4)
                                return res.json({ msg: "Vec postoji cas U OBRADI koji se poklapa sa Vasim terminom. Izaberite drugi termin!" });
                            Util.nastavnikNedostupan(nastavnik, datumVremeStart, datumVremeKraj)
                                .then(data5 => {
                                if (data5)
                                    return res.json({ msg: "Nastavnik je nedostupan u ovom terminu. Izaberite drugi termin!" });
                                const nCas = new cas_1.default({
                                    ucenik: ucenik,
                                    nastavnik: nastavnik,
                                    predmet: predmet,
                                    datum_vreme_start: datumVremeStart.toISOString().slice(0, 16) + "Z",
                                    datum_vreme_kraj: datumVremeKraj.toISOString().slice(0, 16) + "Z",
                                    kratak_opis: kratak_opis,
                                    dupli_cas: dupli_cas,
                                    trajanje: trajanje,
                                    status: "U obradi",
                                    tekst: null,
                                    ocena_ucenik: null,
                                    komentar_ucenik: null,
                                    ocena_nastavnik: null,
                                    komentar_nastavnik: null
                                });
                                nCas
                                    .save()
                                    .then(data6 => res.json({ msg: "OK" }))
                                    .catch(err6 => console.log(err6));
                            })
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
        this.zakaziCasExt = (req, res) => {
            const ucenik = req.body.ucenik;
            const nastavnik = req.body.nastavnik;
            const predmet = req.body.predmet;
            const datum_vreme_start = req.body.datum_vreme_start;
            const datum_vreme_kraj = req.body.datum_vreme_kraj;
            const kratak_opis = req.body.kratak_opis;
            const datumVremeStart = new Date(datum_vreme_start);
            const datumVremeKraj = new Date(datum_vreme_kraj);
            const dupli_cas = false;
            const trajanje = (datumVremeKraj.getTime() - datumVremeStart.getTime()) / 60000;
            if (!Util.proveraBuducnost(datumVremeStart))
                return res.json({ msg: "Zakazani cas mora biti u buducnosti." });
            if (Util.proveraVikend(datumVremeStart))
                return res.json({ msg: "Ne mozete zakazati cas vikendom." });
            if (Util.proveraVreme(datumVremeStart, datumVremeKraj))
                return res.json({ msg: "Ne mozete zakazati cas van radnog vremena (10:00-18:00)." });
            Util.nastavnikNedostupanNedelja(nastavnik, datumVremeStart)
                .then(data1 => {
                if (data1)
                    return res.json({ msg: "Nastavnik je zauzet citave nedelje. Izaberite drugi termin!" });
                Util.nastavnikNedostupanDan(nastavnik, datumVremeStart)
                    .then(data2 => {
                    if (data2)
                        return res.json({ msg: "Nastavnik je zauzet citav dan. Izaberite drugi termin!" });
                    Util.postojiPreklapanje(nastavnik, datumVremeStart, datumVremeKraj, "Prihvacen")
                        .then(data3 => {
                        if (data3)
                            return res.json({ msg: "Vec postoji PRIHVACEN cas koji se poklapa sa Vasim terminom. Izaberite drugi termin!" });
                        Util.postojiPreklapanje(nastavnik, datumVremeStart, datumVremeKraj, "U obradi")
                            .then(data4 => {
                            if (data4)
                                return res.json({ msg: "Vec postoji cas U OBRADI koji se poklapa sa Vasim terminom. Izaberite drugi termin!" });
                            Util.nastavnikNedostupan(nastavnik, datumVremeStart, datumVremeKraj)
                                .then(data5 => {
                                if (data5)
                                    return res.json({ msg: "Nastavnik je nedostupan u ovom terminu. Izaberite drugi termin!" });
                                const nCas = new cas_1.default({
                                    ucenik: ucenik,
                                    nastavnik: nastavnik,
                                    predmet: predmet,
                                    datum_vreme_start: datumVremeStart.toISOString().slice(0, 16) + "Z",
                                    datum_vreme_kraj: datumVremeKraj.toISOString().slice(0, 16) + "Z",
                                    kratak_opis: kratak_opis,
                                    dupli_cas: dupli_cas,
                                    trajanje: trajanje,
                                    status: "U obradi",
                                    tekst: null,
                                    ocena_ucenik: null,
                                    komentar_ucenik: null,
                                    ocena_nastavnik: null,
                                    komentar_nastavnik: null
                                });
                                nCas
                                    .save()
                                    .then(data6 => res.json({ msg: "OK" }))
                                    .catch(err6 => console.log(err6));
                            })
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
        this.potvrdiCas = (req, res) => {
            const _id = req.body._id;
            cas_1.default
                .findByIdAndUpdate(_id, { status: "Prihvacen" })
                .then(data => res.json({ msg: "OK" }))
                .catch(err => console.log(err));
        };
        this.odbijCas = (req, res) => {
            const _id = req.body._id;
            const tekst = req.body.tekst;
            cas_1.default
                .findByIdAndUpdate(_id, { status: "Odbijen", tekst: tekst })
                .then(data => res.json({ msg: "OK" }))
                .catch(err => console.log(err));
        };
        this.unesiKomentarIOcenuUcenik = (req, res) => {
            const _id = req.body._id;
            const komentar_ucenik = req.body.komentar_ucenik;
            const ocena_ucenik = req.body.ocena_ucenik;
            cas_1.default
                .findByIdAndUpdate(_id, { komentar_ucenik: komentar_ucenik, ocena_ucenik: ocena_ucenik })
                .then(data => {
                nastavnik_1.default
                    .findOne({ kor_ime: data.nastavnik })
                    .then(tData => {
                    const ocena = tData.ocena;
                    const br_ocena = tData.br_ocena;
                    const nOcena = (ocena * br_ocena + ocena_ucenik) / (br_ocena + 1);
                    nastavnik_1.default
                        .findOneAndUpdate({ kor_ime: data.nastavnik }, { ocena: nOcena, br_ocena: br_ocena + 1 })
                        .then(fData => res.json({ msg: "OK" }))
                        .catch(fErr => console.log(fErr));
                })
                    .catch(tErr => console.log(tErr));
            })
                .catch(err => console.log(err));
        };
        this.unesiKomentarIOcenuNastavnik = (req, res) => {
            const _id = req.body._id;
            const komentar_nastavnik = req.body.komentar_nastavnik;
            const ocena_nastavnik = req.body.ocena_nastavnik;
            cas_1.default
                .findByIdAndUpdate(_id, { komentar_nastavnik: komentar_nastavnik, ocena_nastavnik: ocena_nastavnik })
                .then(data => {
                ucenik_1.default
                    .findOne({ kor_ime: data.ucenik })
                    .then(tData => {
                    const ocena = tData.ocena;
                    const br_ocena = tData.br_ocena;
                    const nOcena = (ocena * br_ocena + ocena_nastavnik) / (br_ocena + 1);
                    ucenik_1.default
                        .findOneAndUpdate({ kor_ime: data.ucenik }, { ocena: nOcena, br_ocena: br_ocena + 1 })
                        .then(fData => res.json({ msg: "OK" }))
                        .catch(fErr => console.log(fErr));
                })
                    .catch(tErr => console.log(tErr));
            })
                .catch(err => console.log(err));
        };
        this.dohvObavestenjaZaCas = (req, res) => {
            const cas = req.body.cas;
            obavestenje_1.default
                .find({ cas: cas })
                .then(data => res.json(data))
                .catch(err => console.log(err));
        };
        this.kreirajObavestenje = (req, res) => {
            const cas = req.body.cas;
            const tekst = req.body.tekst;
            const datumSad = new Date();
            datumSad.setTime(datumSad.getTime() + 60 * 60 * 1000);
            const sad = datumSad.toISOString().slice(0, 16) + "Z";
            const nObavestenje = new obavestenje_1.default({
                cas: cas,
                tekst: tekst,
                neprocitano: true,
                datum_vreme: sad
            });
            nObavestenje
                .save()
                .then(data => res.json({ msg: "OK" }))
                .catch(err => console.log(err));
        };
        this.procitajObavestenje = (req, res) => {
            const _id = req.body._id;
            obavestenje_1.default
                .findByIdAndUpdate(_id, { neprocitano: false })
                .then(data => res.json({ msg: "OK" }))
                .catch(err => console.log(err));
        };
        this.dohvSveCasoveVremenskiPeriod = (req, res) => {
            const nastavnik = req.body.nastavnik;
            const brojDana = req.body.brojDana;
            const datumSad = new Date();
            datumSad.setTime(datumSad.getTime() + 3600000);
            const datumTri = new Date(datumSad.getTime() + brojDana * 24 * 60 * 60 * 1000);
            const sad = datumSad.toISOString().slice(0, 16) + "Z";
            const tri = datumTri.toISOString().slice(0, 16) + "Z";
            cas_1.default
                .find({ nastavnik: nastavnik, status: "Prihvacen", datum_vreme_start: { $gte: sad, $lte: tri } })
                .sort({ datum_vreme_start: 1 })
                .then(data => res.json(data))
                .catch(err => console.log(err));
        };
        this.dodajNedostupnost = (req, res) => {
            const nastavnik = req.body.nastavnik;
            let datum_vreme_start = req.body.datum_vreme_start + "Z";
            let datum_vreme_kraj = req.body.datum_vreme_kraj + "Z";
            const datumVremeStart = new Date(datum_vreme_start);
            const datumVremeKraj = new Date(datum_vreme_kraj);
            Util.popraviDatumStart(datumVremeStart);
            Util.popraviDatumKraj(datumVremeKraj);
            if (Util.proveriIstiDan(datumVremeStart, datumVremeKraj))
                Util.popraviIstiDan(datumVremeStart, datumVremeKraj);
            else
                Util.popraviRazlDan(datumVremeStart, datumVremeKraj);
            datum_vreme_start = datumVremeStart.toISOString().slice(0, 16) + "Z";
            datum_vreme_kraj = datumVremeKraj.toISOString().slice(0, 16) + "Z";
            if (!Util.proveraBuducnost(datumVremeStart))
                return res.json({ msg: "Vasa nova nedostupnost mora biti u buducnosti." });
            if (!Util.proveraPrePosle(datumVremeStart, datumVremeKraj))
                return res.json({ msg: "Neispravno vreme nedostupnosti. Pokusajte ponovo!" });
            Util.postojiPreklapanje(nastavnik, datumVremeStart, datumVremeKraj, "Prihvacen")
                .then(data3 => {
                if (data3)
                    return res.json({ msg: "Vec postoji PRIHVACEN cas koji se preklapa sa Vasim terminom nedostupnosti. Izaberite drugi termin!" });
                Util.postojiPreklapanje(nastavnik, datumVremeStart, datumVremeKraj, "U obradi")
                    .then(data4 => {
                    if (data4)
                        return res.json({ msg: "Vec postoji cas U OBRADI koji se preklapa sa Vasim terminom. Izaberite drugi termin!" });
                    Util.nastavnikNedostupan(nastavnik, datumVremeStart, datumVremeKraj)
                        .then(data5 => {
                        if (data5)
                            return res.json({ msg: "Vec ste nedostupni u ovom terminu. Izaberite drugi termin!" });
                        const nedostp = datum_vreme_start + "###" + datum_vreme_kraj;
                        nastavnik_1.default
                            .findOneAndUpdate({ kor_ime: nastavnik }, { $push: { nedostupnost: nedostp } })
                            .then(tData => res.json({ msg: "OK" }))
                            .catch(tErr => console.log(tErr));
                    })
                        .catch(err5 => console.log(err5));
                })
                    .catch(err4 => console.log(err4));
            })
                .catch(err3 => console.log(err3));
        };
        this.dodajNedostupnostExt = (req, res) => {
            const nastavnik = req.body.nastavnik;
            let datum_vreme_start = req.body.datum_vreme_start;
            let datum_vreme_kraj = req.body.datum_vreme_kraj;
            const datumVremeStart = new Date(datum_vreme_start);
            const datumVremeKraj = new Date(datum_vreme_kraj);
            Util.popraviDatumStart(datumVremeStart);
            Util.popraviDatumKraj(datumVremeKraj);
            if (Util.proveriIstiDan(datumVremeStart, datumVremeKraj))
                Util.popraviIstiDan(datumVremeStart, datumVremeKraj);
            else
                Util.popraviRazlDan(datumVremeStart, datumVremeKraj);
            datum_vreme_start = datumVremeStart.toISOString().slice(0, 16) + "Z";
            datum_vreme_kraj = datumVremeKraj.toISOString().slice(0, 16) + "Z";
            if (!Util.proveraBuducnost(datumVremeStart))
                return res.json({ msg: "Vasa nova nedostupnost mora biti u buducnosti." });
            if (!Util.proveraPrePosle(datumVremeStart, datumVremeKraj))
                return res.json({ msg: "Neispravno vreme nedostupnosti. Pokusajte ponovo!" });
            Util.postojiPreklapanje(nastavnik, datumVremeStart, datumVremeKraj, "Prihvacen")
                .then(data3 => {
                if (data3)
                    return res.json({ msg: "Vec postoji PRIHVACEN cas koji se preklapa sa Vasim terminom nedostupnosti. Izaberite drugi termin!" });
                Util.postojiPreklapanje(nastavnik, datumVremeStart, datumVremeKraj, "U obradi")
                    .then(data4 => {
                    if (data4)
                        return res.json({ msg: "Vec postoji cas U OBRADI koji se preklapa sa Vasim terminom. Izaberite drugi termin!" });
                    Util.nastavnikNedostupan(nastavnik, datumVremeStart, datumVremeKraj)
                        .then(data5 => {
                        if (data5)
                            return res.json({ msg: "Vec ste nedostupni u ovom terminu. Izaberite drugi termin!" });
                        const nedostp = datum_vreme_start + "###" + datum_vreme_kraj;
                        nastavnik_1.default
                            .findOneAndUpdate({ kor_ime: nastavnik }, { $push: { nedostupnost: nedostp } })
                            .then(tData => res.json({ msg: "OK" }))
                            .catch(tErr => console.log(tErr));
                    })
                        .catch(err5 => console.log(err5));
                })
                    .catch(err4 => console.log(err4));
            })
                .catch(err3 => console.log(err3));
        };
        this.dohvCasoveUcenikNastavnik = (req, res) => {
            const ucenik = req.body.ucenik;
            const nastavnik = req.body.nastavnik;
            const datumSad = new Date();
            datumSad.setTime(datumSad.getTime() + 3600000);
            const sad = datumSad.toISOString().slice(0, 16) + "Z";
            cas_1.default
                .find({ ucenik: ucenik, nastavnik: nastavnik, status: "Prihvacen", datum_vreme_kraj: { $lt: sad } })
                .sort({ predmet: 1, datum_vreme_start: 1 })
                .then(data => res.json(data))
                .catch(err => console.log(err));
        };
        this.dohvBrAngazovanihNastavnikaPredmet = (req, res) => {
            const predmet = req.body.predmet;
            nastavnik_1.default
                .countDocuments({ predmeti: { $in: [predmet] } })
                .then(data => res.json(data))
                .catch(err => console.log(err));
        };
        this.dohvBrAngazovanihNastavnikaUzrast = (req, res) => {
            const uzrast = req.body.uzrast;
            nastavnik_1.default
                .countDocuments({ uzrast: { $in: [uzrast] } })
                .then(data => res.json(data))
                .catch(err => console.log(err));
        };
        this.dohvBrLjudiPol = (req, res) => {
            const pol = req.body.pol;
            const tip = req.body.tip;
            korisnik_1.default
                .countDocuments({ tip: tip, pol: pol })
                .then(data => res.json(data))
                .catch(err => console.log(err));
        };
        this.dohvSveNastavnike = (req, res) => {
            korisnik_1.default
                .find({ tip: "Nastavnik" })
                .then(data => res.json(data))
                .catch(err => console.log(err));
        };
        this.dohvSveUcenike = (req, res) => {
            korisnik_1.default
                .find({ tip: "Ucenik" })
                .then(data => res.json(data))
                .catch(err => console.log(err));
        };
        this.dohvBrojCasovaNastavnikMesec2023 = (req, res) => {
            const nastavnik = req.body.nastavnik;
            /*
            Cas
                .countDocuments({
                    nastavnik: nastavnik, status: "Prihvacen",
                    datum_vreme_start: {$gte: "2023-01-01T00:00Z", $lt: "2024-01-01T00:00Z"}
                })
                .then(data => res.json(data))
                .catch(err => console.log(err));
            */
            cas_1.default
                .aggregate([
                {
                    $match: {
                        nastavnik: nastavnik, status: "Prihvacen",
                        datum_vreme_start: { $gte: "2023-01-01T00:00Z", $lt: "2024-01-01T00:00Z" }
                    }
                },
                {
                    $project: {
                        month: {
                            $month: {
                                $dateFromString: {
                                    dateString: "$datum_vreme_start"
                                }
                            }
                        }
                    }
                },
                {
                    $group: {
                        _id: "$month",
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: { _id: 1 }
                }
            ])
                .then(data => {
                const countsByMonth = Array(12).fill(0);
                data.forEach(item => {
                    if (item._id >= 1 && item._id <= 12) {
                        countsByMonth[item._id - 1] = item.count;
                    }
                });
                res.json(countsByMonth);
            })
                .catch(err => console.log(err));
        };
        this.dohvBrojCasovaNastavnikDan2023 = (req, res) => {
            const nastavnik = req.body.nastavnik;
            cas_1.default
                .aggregate([
                {
                    $match: {
                        nastavnik: nastavnik, status: "Prihvacen",
                        datum_vreme_start: { $gte: "2023-01-01T00:00Z", $lt: "2024-01-01T00:00Z" }
                    }
                },
                {
                    $project: {
                        dayOfWeek: {
                            $dayOfWeek: {
                                $dateFromString: {
                                    dateString: "$datum_vreme_start"
                                }
                            }
                        }
                    }
                },
                {
                    $group: {
                        _id: "$dayOfWeek",
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: { _id: 1 }
                }
            ])
                .then(data => {
                const countsByDayOfWeek = Array(7).fill(0);
                data.forEach(item => {
                    countsByDayOfWeek[item._id - 1] = item.count;
                });
                res.json(countsByDayOfWeek);
            })
                .catch(err => console.log(err));
        };
        this.dohvSveCasove = (req, res) => {
            cas_1.default
                .find()
                .then(data => res.json(data))
                .catch(err => console.log(err));
        };
        this.dohvUkupanBrKorisnika = (req, res) => {
            korisnik_1.default
                .countDocuments()
                .then(data => res.json(data))
                .catch(err => console.log(err));
        };
        this.dohvBrBezProfilne = (req, res) => {
            korisnik_1.default
                .countDocuments({ prof_slika: "../images/default-profile-picture.jpg" })
                .then(data => res.json(data))
                .catch(err => console.log(err));
        };
        this.dohvSvePredmete = (req, res) => {
            predmet_1.default
                .find()
                .then(data => res.json(data))
                .catch(err => console.log(err));
        };
        this.odbijPredmet = (req, res) => {
            const predmet = req.body.predmet;
            predmet_1.default
                .findOneAndUpdate({ naziv: predmet }, { status: "Odbijen" })
                .then(data => res.json({ msg: "OK" }))
                .catch(err => console.log(err));
        };
        this.azurirajBezbPitanjeOdgovor = (req, res) => {
            const kor_ime = req.body.kor_ime;
            const bezb_pitanje = req.body.bezb_pitanje;
            const bezb_odgovor = req.body.bezb_odgovor;
            korisnik_1.default
                .findOneAndUpdate({ kor_ime: kor_ime }, { bezb_pitanje: bezb_pitanje, bezb_odgovor: bezb_odgovor })
                .then(data => res.json({ msg: "OK" }))
                .catch(err => console.log(err));
        };
        this.proveriJedinstvenMejl = (req, res) => {
            const email = req.body.email;
            korisnik_1.default
                .findOne({ email: email })
                .then(data => res.json(data))
                .catch(err => console.log(err));
        };
    }
}
exports.ZController = ZController;
