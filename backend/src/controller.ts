import express from "express";
import * as Util from "./util";
import Korisnik from "./models/korisnik";
import Ucenik from "./models/ucenik";
import Nastavnik from "./models/nastavnik";
import Admin from "./models/admin";
import Cas from "./models/cas";
import Predmet from "./models/predmet";
import Obavestenje from "./models/obavestenje";

export class ZController {
    login = (req: express.Request, res: express.Response) => {
        const kor_ime = req.body.kor_ime;
        const lozinka = req.body.lozinka;
        const tip = req.body.tip;

        Korisnik
            .findOne({kor_ime: kor_ime, tip: tip, zahtev_status: "Prihvacen"})
            .then(data1 => {
                if (!data1) return res.json(null);
                Util.verifyPassword(lozinka, data1.lozinka!)
                    .then(data2 => {
                        if (data2) {
                            data1.prof_slika = Util.loadPicture(data1.prof_slika!);
                            return res.json(data1);
                        }
                        else return res.json(null);
                    })
                    .catch(err2 => console.log(err2));
            })
            .catch(err1 => console.log(err1));
    };

    loginAdmin = (req: express.Request, res: express.Response) => {
        const kor_ime = req.body.kor_ime;
        const lozinka = req.body.lozinka;

        Korisnik
            .findOne({kor_ime: kor_ime, tip: "Admin", zahtev_status: "Prihvacen"})
            .then(data1 => {
                if (!data1) return res.json(null);
                Util.verifyPassword(lozinka, data1.lozinka!)
                    .then(data2 => {
                        if (data2) {
                            data1.prof_slika = Util.loadPicture(data1.prof_slika!);
                            return res.json(data1);
                        }
                        else return res.json(null);
                    })
                    .catch(err2 => console.log(err2));
            })
            .catch(err1 => console.log(err1));
    };

    dohvKorisnika = (req: express.Request, res: express.Response) => {
        const kor_ime = req.body.kor_ime;

        Korisnik
            .findOne({kor_ime: kor_ime})
            .then(data => {
                if (data) data.prof_slika = Util.loadPicture(data.prof_slika!);
                res.json(data)
            })
            .catch(err => console.log(err));
    };

    dohvUcenika = (req: express.Request, res: express.Response) => {
        const kor_ime = req.body.kor_ime;

        Ucenik
            .findOne({kor_ime: kor_ime})
            .then(data => res.json(data))
            .catch(err => console.log(err));
    };

    dohvNastavnika = (req: express.Request, res: express.Response) => {
        const kor_ime = req.body.kor_ime;

        Nastavnik
            .findOne({kor_ime: kor_ime})
            .then(data => {
                if (data) data.cv_pdf = Util.loadPdf(data.cv_pdf!);
                res.json(data)
            })
            .catch(err => console.log(err));
    };

    registracijaUcenik = (req: express.Request, res: express.Response) => {
        const kor_ime = req.body.kor_ime;

        Korisnik
            .findOne({kor_ime: kor_ime})
            .then(data1 => {
                if (data1) return res.json({msg: "Niste uneli jedinstveno korisnicko ime."});
                const email = req.body.email;
                
                Korisnik
                    .findOne({email: email})
                    .then(data2 => {
                        if (data2) return res.json({msg: "Niste uneli jedinstven mejl."})
                        const lozinka = req.body.lozinka;
                        
                        Util.hashPassword(lozinka)
                            .then(data3 => {
                                const prof_path = Util.savePicture(req.body.prof_slika);
                                
                                const nKorisnik = new Korisnik({
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
                                        const nUcenik = new Ucenik({
                                            kor_ime: kor_ime,
                                            tip_skole: req.body.tip_skole,
                                            tr_razred: req.body.tr_razred,
                                            ocena: 0.00,
                                            br_ocena: 0
                                        });

                                        nUcenik
                                            .save()
                                            .then(data5 => res.json({msg: "OK"}))
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

    registracijaNastavnik = (req: express.Request, res: express.Response) => {
        const kor_ime = req.body.kor_ime;

        Korisnik
            .findOne({kor_ime: kor_ime})
            .then(data1 => {
                if (data1) return res.json({msg: "Niste uneli jedinstveno korisnicko ime."});
                const email = req.body.email;

                Korisnik
                    .findOne({email: email})
                    .then(data2 => {
                        if (data2) return res.json({msg: "Niste uneli jedinstven mejl."})
                        const lozinka = req.body.lozinka;

                        Util.hashPassword(lozinka)
                            .then(data3 => {
                                const prof_path = Util.savePicture(req.body.prof_slika);

                                const nKorisnik = new Korisnik({
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

                                        const nNastavnik = new Nastavnik({
                                            kor_ime: kor_ime,
                                            cv_pdf: cv_path,
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
                                            .then(data5 => res.json({msg: "OK"}))
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

    prihvatiNastavnika = (req: express.Request, res: express.Response) => {
        const kor_ime = req.body.kor_ime;

        Korisnik
            .findOneAndUpdate({kor_ime: kor_ime, tip: "Nastavnik"}, {zahtev_status: "Prihvacen"})
            .then(data => res.json({msg: "OK"}))
            .catch(err => console.log(err));
    };

    odbijNastavnika = (req: express.Request, res: express.Response) => {
        const kor_ime = req.body.kor_ime;

        Korisnik
            .findOneAndUpdate({kor_ime: kor_ime, tip: "Nastavnik"}, {zahtev_status: "Odbijen"})
            .then(data => res.json({msg: "OK"}))
            .catch(err => console.log(err));
    };

    predloziPredmete = (req: express.Request, res: express.Response) => {
        const predmeti = req.body.predmeti;
        let cnt = predmeti.length;
        
        for (let pr of predmeti) {
            Predmet
                .findOne({naziv: pr})
                .then(data => {
                    if (!data) {
                        const nPredmet = new Predmet({
                            naziv: pr,
                            status: "U obradi"
                        });

                        nPredmet
                            .save()
                            .then(tData => {
                                --cnt;
                                if (cnt == 0) return res.json({msg: "OK"});
                            })
                            .catch(tErr => console.log(tErr));
                    }
                    else {
                        --cnt;
                        if (cnt == 0) return res.json({msg: "OK"});
                    }
                })
                .catch(err => console.log(err));
        }
    };

    prihvatiPredmet = (req: express.Request, res: express.Response) => {
        const naziv = req.body.naziv;

        Predmet
            .findOneAndUpdate({naziv: naziv}, {status: "Prihvacen"})
            .then(data => res.json({msg: "OK"}))
            .catch(err => console.log(err));
    };

    dodajPredmet = (req: express.Request, res: express.Response) => {
        const nPredmet = new Predmet({
            naziv: req.body.naziv,
            status: "Prihvacen"
        });

        nPredmet
            .save()
            .then(data => res.json({msg: "OK"}))
            .catch(err => console.log(err));
    };

    promeniLozinkuZnamStaru = (req: express.Request, res: express.Response) => {
        const kor_ime = req.body.kor_ime;
        const staraLozinka = req.body.staraLozinka;
        const novaLozinka = req.body.novaLozinka;

        Korisnik
            .findOne({kor_ime: kor_ime})
            .then(data1 => {
                Util.verifyPassword(staraLozinka, data1!.lozinka!)
                    .then(data2 => {
                        if (!data2) return res.json({msg: "Neispravna stara lozinka."});
                        Util.hashPassword(novaLozinka)
                            .then(data3 => {
                                Korisnik
                                    .findOneAndUpdate({kor_ime: kor_ime}, {lozinka: data3})
                                    .then(data4 => res.json({msg: "OK"}))
                                    .catch(err4 => console.log(err4));
                            })
                            .catch(err3 => console.log(err3));
                    })
                    .catch(err2 => console.log(err2));
            })
            .catch(err1 => console.log(err1));
    };

    promeniLozinkuNeZnamStaru = (req: express.Request, res: express.Response) => {
        const kor_ime = req.body.kor_ime;
        const novaLozinka = req.body.novaLozinka;

        Util.hashPassword(novaLozinka)
            .then(data => {
                Korisnik
                    .findOneAndUpdate({kor_ime: kor_ime}, {lozinka: data})
                    .then(tData => res.json({msg: "OK"}))
                    .catch(tErr => console.log(tErr));
            })
            .catch(err => console.log(err));
    };

    dohvBezbPitanje = (req: express.Request, res: express.Response) => {
        const kor_ime = req.body.kor_ime;
        
        Korisnik
            .findOne({kor_ime: kor_ime})
            .then(data => res.json({msg: data!.bezb_pitanje!}))
            .catch(err => console.log(err));
    };

    proveriBezbOdgovor = (req: express.Request, res: express.Response) => {
        const kor_ime = req.body.kor_ime;
        const bezb_odgovor = req.body.bezb_odgovor;

        Korisnik
            .findOne({kor_ime: kor_ime, bezb_odgovor: bezb_odgovor})
            .then(data => res.json(data != null))
            .catch(err => console.log(err));
    };

    dohvUkupanBrojUcenika = (req: express.Request, res: express.Response) => {
        Ucenik
            .countDocuments({})
            .then(data => res.json(data))
            .catch(err => console.log(err));
    };

    dohvUkupanBrojAktivnihNastavnika = (req: express.Request, res: express.Response) => {
        Korisnik
            .countDocuments({tip: "Nastavnik", zahtev_status: "Prihvacen"})
            .then(data => res.json(data))
            .catch(err => console.log(err));
    };

    dohvBrojOdrzanihCasovaPrethNedelja = (req: express.Request, res: express.Response) => {
        const today = new Date();
        const lastWeek = new Date();
        lastWeek.setDate(today.getDate() - 7);

        Cas
            .countDocuments({datum_vreme_start: {$gte: lastWeek.toISOString()}, status: "Prihvacen"})
            .then(data => res.json(data))
            .catch(err => console.log(err));
    };

    dohvBrojOdrzanihCasovaPrethMesec = (req: express.Request, res: express.Response) => {
        const today = new Date();
        const lastMonth = new Date();
        lastMonth.setDate(today.getDate() - 30);

        Cas
            .countDocuments({datum_vreme_start: {$gte: lastMonth.toISOString()}, status: "Prihvacen"})
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

    dohvPredmete = (req: express.Request, res: express.Response) => {
        Predmet
            .find({status: "Prihvacen"})
            .then(data => res.json(data))
            .catch(err => console.log(err));
    };

    dohvAngazovaneNastavnike = (req: express.Request, res: express.Response) => {
        const predmet = req.body.predmet;

        Nastavnik
            .find({predmeti: {$in: [predmet]}})
            .then(data => {
                for (let nast of data)
                    nast.cv_pdf = Util.loadPdf(nast.cv_pdf!);
                res.json(data)
            })
            .catch(err => console.log(err));
    };

    dohvAngazovaneNastavnikeExt = (req: express.Request, res: express.Response) => {
        const predmet = req.body.predmet;
        const uzrast = req.body.uzrast;

        Nastavnik
            .find({predmeti: {$in: [predmet]}, uzrast: {$in: [uzrast]}})
            .then(data => {
                for (let nast of data)
                    nast.cv_pdf = Util.loadPdf(nast.cv_pdf!);
                res.json(data)
            })
            .catch(err => console.log(err));
    };

    azurirajIme = (req: express.Request, res: express.Response) => {
        const kor_ime = req.body.kor_ime;
        const ime = req.body.ime;

        Korisnik
            .findOneAndUpdate({kor_ime: kor_ime}, {ime: ime})
            .then(data => res.json({msg: "OK"}))
            .catch(err => console.log(err));
    };

    azurirajPrezime = (req: express.Request, res: express.Response) => {
        const kor_ime = req.body.kor_ime;
        const prezime = req.body.prezime;

        Korisnik
            .findOneAndUpdate({kor_ime: kor_ime}, {prezime: prezime})
            .then(data => res.json({msg: "OK"}))
            .catch(err => console.log(err));
    };

    azurirajAdresu = (req: express.Request, res: express.Response) => {
        const kor_ime = req.body.kor_ime;
        const adresa = req.body.adresa;

        Korisnik
            .findOneAndUpdate({kor_ime: kor_ime}, {adresa: adresa})
            .then(data => res.json({msg: "OK"}))
            .catch(err => console.log(err));
    };

    azurirajEmail = (req: express.Request, res: express.Response) => {
        const kor_ime = req.body.kor_ime;
        const email = req.body.email;

        Korisnik
            .findOneAndUpdate({kor_ime: kor_ime}, {email: email})
            .then(data => res.json({msg: "OK"}))
            .catch(err => console.log(err));
    };

    azurirajTelefon = (req: express.Request, res: express.Response) => {
        const kor_ime = req.body.kor_ime;
        const telefon = req.body.telefon;

        Korisnik
            .findOneAndUpdate({kor_ime: kor_ime}, {telefon: telefon})
            .then(data => res.json({msg: "OK"}))
            .catch(err => console.log(err));
    };

    azurirajTrRazred = (req: express.Request, res: express.Response) => {
        const kor_ime = req.body.kor_ime;
        const tip_skole = req.body.tip_skole;

        Ucenik
            .findOne({kor_ime: kor_ime})
            .then(data => {
                const tr_razred = data!.tr_razred!;
                if (tr_razred === 8 && tip_skole !== "") {
                    Ucenik
                        .findOneAndUpdate({kor_ime: kor_ime}, {tr_razred: 1, tip_skole: tip_skole})
                        .then(data1 => res.json({msg: "OK"}))
                        .catch(err1 => console.log(err1));
                }
                else {
                    Ucenik
                        .findOneAndUpdate({kor_ime: kor_ime}, {tr_razred: tr_razred + 1})
                        .then(data2 => res.json({msg: "OK"}))
                        .catch(err2 => console.log(err2));
                }
            })
            .catch(err => console.log(err));
    };

    azurirajProfSliku = (req: express.Request, res: express.Response) => {
        const kor_ime = req.body.kor_ime;
        const prof_slika = req.body.prof_slika;

        Korisnik
            .findOne({kor_ime: kor_ime})
            .then(data => {
                if (data!.prof_slika !== Util.default_slika) Util.deleteFile(data!.prof_slika!);
                const prof_path = prof_slika === "" ? Util.default_slika : Util.savePicture(prof_slika);;

                Korisnik
                    .findOneAndUpdate({kor_ime: kor_ime}, {prof_slika: prof_path})
                    .then(tData => res.json({msg: "OK"}))
                    .catch(tErr => console.log(tErr));
            })
            .catch(err => console.log(err));
    };

    dohvCasoveNastavnika = (req: express.Request, res: express.Response) => {
        const nastavnik = req.body.nastavnik;

        Cas
            .find({nastavnik: nastavnik})
            .then(data => res.json(data))
            .catch(err => console.log(err));
    };

    /*
        1)	zakazivanje casa vikendom
        2)	pocetak casa pre 10:00 ili kraj casa posle 18:00
        3)	u toj nedelji, nije dostupan (ponedeljak 10:00 do petka 18:00)
        4)	taj dan, nije dostupan (taj dan 10:00 do taj dan 18:00)
        5)	preklapanje
    */

    zakaziCas = (req: express.Request, res: express.Response) => {
        const ucenik = req.body.ucenik;
        const nastavnik = req.body.nastavnik;
        const predmet = req.body.predmet;
        const datum_vreme_start = req.body.datum_vreme_start;
        const kratak_opis = req.body.kratak_opis;
        const dupli_cas = req.body.dupli_cas;
        const trajanje = req.body.trajanje;

        const datumVremeStart = new Date(datum_vreme_start);
        const datumVremeKraj = new Date(datumVremeStart.getTime() + trajanje * 60000 * (dupli_cas ? 2 : 1));

        if (Util.proveraVikend(datumVremeStart)) 
            return res.json({msg: "Ne mozete zakazati cas vikendom."});
        if (Util.proveraVreme(datumVremeStart, datumVremeKraj)) 
            return res.json({msg: "Ne mozete zakazati cas van radnog vremena (10:00-18:00)."});

        Util.nastavnikNedostupanNedelja(nastavnik, datumVremeStart)
            .then(data1 => {
                if (data1) return res.json({msg: "Nastavnik je zauzet citave nedelje. Izaberite drugi termin!"});
                Util.nastavnikNedostupanDan(nastavnik, datumVremeStart)
                    .then(data2 => {
                        if (data2) return res.json({msg: "Nastavnik je zauzet citav dan. Izaberite drugi termin!"});
                        Util.postojiPreklapanje(nastavnik, datumVremeStart, datumVremeKraj, "Prihvacen")
                            .then(data3 => {
                                if (data3) return res.json({msg: "Vec postoji PRIHVACEN cas koji se poklapa sa Vasim terminom. Izaberite drugi termin!"});
                                Util.postojiPreklapanje(nastavnik, datumVremeStart, datumVremeKraj, "U obradi")
                                .then(data4 => {
                                    if (data3) return res.json({msg: "Vec postoji cas U OBRADI koji se poklapa sa Vasim terminom. Izaberite drugi termin!"});
                                    const nCas = new Cas({
                                        ucenik: ucenik,
                                        nastavnik: nastavnik,
                                        predmet: predmet,
                                        datum_vreme_start: datumVremeStart.toISOString(),
                                        datum_vreme_end: datumVremeKraj.toISOString(),
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
                                        .then(data5 => res.json({msg: "OK"}))
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


}