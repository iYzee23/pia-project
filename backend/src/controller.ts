import express from "express";
import { hashPassword, verifyPassword } from "./cryption";
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
                verifyPassword(lozinka, data1.lozinka!)
                    .then(data2 => {
                        if (data2) return res.json(data1);
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
                verifyPassword(lozinka, data1.lozinka!)
                    .then(data2 => {
                        if (data2) return res.json(data1);
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
            .then(data => res.json(data))
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
            .then(data => res.json(data))
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

                        hashPassword(lozinka)
                            .then(data3 => {
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
                                    prof_slika: req.body.prof_slika,
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

                        hashPassword(lozinka)
                            .then(data3 => {
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
                                    prof_slika: req.body.prof_slika,
                                    zahtev_status: "U obradi"
                                });

                                nKorisnik
                                    .save()
                                    .then(data4 => {
                                        const nNastavnik = new Nastavnik({
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
                verifyPassword(staraLozinka, data1!.lozinka!)
                    .then(data2 => {
                        if (!data2) return res.json({msg: "Neispravna stara lozinka."});
                        hashPassword(novaLozinka)
                            .then(data3 => {
                                Korisnik
                                    .findByIdAndUpdate({kor_ime: kor_ime}, {lozinka: data3})
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

        hashPassword(novaLozinka)
            .then(data => {
                Korisnik
                    .findByIdAndUpdate({kor_ime: kor_ime}, {lozinka: data})
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
}