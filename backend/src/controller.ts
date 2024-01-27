import express from "express";
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
            .findOne({kor_ime: kor_ime, lozinka: lozinka, tip: tip})
            .then(data => res.json(data))
            .catch(err => console.log(err));
    };

    loginAdmin = (req: express.Request, res: express.Response) => {
        const kor_ime = req.body.kor_ime;
        const lozinka = req.body.lozinka;

        Korisnik
            .findOne({kor_ime: kor_ime, lozinka: lozinka, tip: "Admin"})
            .then(data => res.json(data))
            .catch(err => console.log(err));
    };
}