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
            .findOne({kor_ime: kor_ime, tip: tip})
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
            .findOne({kor_ime: kor_ime, tip: "Admin"})
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
}