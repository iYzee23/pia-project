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

    /*
        predmeti nastavnika ce morati da se filtriraju po adminovom neodobravanju
        --> takodje, posto inicijalno prikazujemo i neprihvacene predmete nastavnika
        --> neki ucenik kod njega moze da zakaze cas iz ovakvog predmeta
        --> zato, ukoliko admin odbije predmet, mi cemo da otkazemo taj cas i posaljemo obavestenje
        slobodna forma: clanovi niza su razdvojeni zarezom
    */

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

    /*
        zbog ova dva azuriranja, moci ce da nastanu neke nekonzistentne situacije
        npr, treba za 5 dana da drzim cas iz matematike, a promenio sam ovaj predmet i vise ne predajem
        ovakvi casovi ce ipak moci da se odrze
    */

    azurirajPredmete = (req: express.Request, res: express.Response) => {
        const kor_ime = req.body.kor_ime;
        const predmeti = req.body.predmeti;

        Nastavnik
            .findOneAndUpdate({kor_ime: kor_ime}, {predmeti: predmeti})
            .then(data => res.json({msg: "OK"}))
            .catch(err => console.log(err));
    };

    azurirajUzraste = (req: express.Request, res: express.Response) => {
        const kor_ime = req.body.kor_ime;
        const uzrasti = req.body.uzrasti;

        Nastavnik
            .findOneAndUpdate({kor_ime: kor_ime}, {uzrast: uzrasti})
            .then(data => res.json({msg: "OK"}))
            .catch(err => console.log(err));
    };

    dohvCasoveNastavnika = (req: express.Request, res: express.Response) => {
        const nastavnik = req.body.nastavnik;

        Cas
            .find({nastavnik: nastavnik})
            .then(data => res.json(data))
            .catch(err => console.log(err));
    };

    dohvCasoveUcenika = (req: express.Request, res: express.Response) => {
        const ucenik = req.body.ucenik;

        Cas
            .find({ucenik: ucenik})
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
        const datum_vreme_start = req.body.datum_vreme_start + "Z";
        const kratak_opis = req.body.kratak_opis;
        const dupli_cas = req.body.dupli_cas;
        const trajanje = req.body.trajanje;

        const datumVremeStart = new Date(datum_vreme_start);
        const datumVremeKraj = new Date(datumVremeStart.getTime() + trajanje * 60000 * (dupli_cas ? 2 : 1));

        if (!Util.proveraBuducnost(datumVremeStart))
            return res.json({msg: "Zakazani cas mora biti u buducnosti."});
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
                                        if (data4) return res.json({msg: "Vec postoji cas U OBRADI koji se poklapa sa Vasim terminom. Izaberite drugi termin!"});
                                        Util.nastavnikNedostupan(nastavnik, datumVremeStart, datumVremeKraj)
                                            .then(data5 => {
                                                if (data5) return res.json({msg: "Nastavnik je nedostupan u ovom terminu. Izaberite drugi termin!"});
                                                const nCas = new Cas({
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
                                                    .then(data6 => res.json({msg: "OK"}))
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

    zakaziCasExt = (req: express.Request, res: express.Response) => {
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
            return res.json({msg: "Zakazani cas mora biti u buducnosti."});
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
                                        if (data4) return res.json({msg: "Vec postoji cas U OBRADI koji se poklapa sa Vasim terminom. Izaberite drugi termin!"});
                                        Util.nastavnikNedostupan(nastavnik, datumVremeStart, datumVremeKraj)
                                            .then(data5 => {
                                                if (data5) return res.json({msg: "Nastavnik je nedostupan u ovom terminu. Izaberite drugi termin!"});
                                                const nCas = new Cas({
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
                                                    .then(data6 => res.json({msg: "OK"}))
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

    potvrdiCas = (req: express.Request, res: express.Response) => {
        const _id = req.body._id;

        Cas
            .findByIdAndUpdate(_id, {status: "Prihvacen"})
            .then(data => res.json({msg: "OK"}))
            .catch(err => console.log(err));
    };

    odbijCas = (req: express.Request, res: express.Response) => {
        const _id = req.body._id;

        Cas
            .findByIdAndUpdate(_id, {status: "Odbijen"})
            .then(data => res.json({msg: "OK"}))
            .catch(err => console.log(err));
    };

    unesiKomentarIOcenuUcenik = (req: express.Request, res: express.Response) => {
        const _id = req.body._id;
        const komentar_ucenik = req.body.komentar_ucenik;
        const ocena_ucenik = req.body.ocena_ucenik;

        Cas
            .findByIdAndUpdate(_id, {komentar_ucenik: komentar_ucenik, ocena_ucenik: ocena_ucenik})
            .then(data => {
                Nastavnik
                    .findOne({kor_ime: data!.nastavnik})
                    .then(tData => {
                        const ocena = tData!.ocena!;
                        const br_ocena = tData!.br_ocena!;
                        const nOcena = (ocena * br_ocena + ocena_ucenik) / (br_ocena + 1);
                        Nastavnik
                            .findOneAndUpdate({kor_ime: data!.nastavnik}, {ocena: nOcena, br_ocena: br_ocena + 1})
                            .then(fData => res.json({msg: "OK"}))
                            .catch(fErr => console.log(fErr));
                    })
                    .catch(tErr => console.log(tErr));
            })
            .catch(err => console.log(err));
    };

    unesiKomentarIOcenuNastavnik = (req: express.Request, res: express.Response) => {
        const _id = req.body._id;
        const komentar_nastavnik = req.body.komentar_nastavnik;
        const ocena_nastavnik = req.body.ocena_nastavnik;

        Cas
            .findByIdAndUpdate(_id, {komentar_nastavnik: komentar_nastavnik, ocena_nastavnik: ocena_nastavnik})
            .then(data => {
                Ucenik
                    .findOne({kor_ime: data!.ucenik})
                    .then(tData => {
                        const ocena = tData!.ocena!;
                        const br_ocena = tData!.br_ocena!;
                        const nOcena = (ocena * br_ocena + ocena_nastavnik) / (br_ocena + 1);
                        Ucenik
                            .findOneAndUpdate({kor_ime: data!.ucenik}, {ocena: nOcena, br_ocena: br_ocena + 1})
                            .then(fData => res.json({msg: "OK"}))
                            .catch(fErr => console.log(fErr));
                    })
                    .catch(tErr => console.log(tErr));
            })
            .catch(err => console.log(err));
    };

    dohvObavestenjaZaCas = (req: express.Request, res: express.Response) => {
        const cas = req.body.cas;

        Obavestenje
            .find({cas: cas})
            .then(data => res.json(data))
            .catch(err => console.log(err));
    };

    kreirajObavestenje = (req: express.Request, res: express.Response) => {
        const cas = req.body.cas;
        const tekst = req.body.tekst;

        const nObavestenje = new Obavestenje({
            cas: cas,
            tekst: tekst,
            neprocitano: true
        });

        nObavestenje
            .save()
            .then(data => res.json({msg: "OK"}))
            .catch(err => console.log(err));
    };

    procitajObavestenje = (req: express.Request, res: express.Response) => {
        const _id = req.body._id;

        Obavestenje
            .findByIdAndUpdate(_id, {neprocitano: false})
            .then(data => res.json({msg: "OK"}))
            .catch(err => console.log(err));
    };


}