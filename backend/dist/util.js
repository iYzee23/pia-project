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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postojiPreklapanje = exports.nastavnikNedostupanDan = exports.nastavnikNedostupanNedelja = exports.proveraVreme = exports.proveraVikend = exports.proveraBuducnost = exports.loadPdf = exports.savePdf = exports.loadPicture = exports.savePicture = exports.deleteFile = exports.verifyPassword = exports.hashPassword = exports.default_slika = void 0;
const bcrypt = __importStar(require("bcrypt"));
const fs_1 = __importDefault(require("fs"));
const nastavnik_1 = __importDefault(require("./models/nastavnik"));
const cas_1 = __importDefault(require("./models/cas"));
const saltRounds = 10;
exports.default_slika = "../images/default-profile-picture.jpg";
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcrypt.hash(password, saltRounds);
    });
}
exports.hashPassword = hashPassword;
function verifyPassword(inputPassword, storedHash) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcrypt.compare(inputPassword, storedHash);
    });
}
exports.verifyPassword = verifyPassword;
function deleteFile(url) {
    if (fs_1.default.existsSync(url))
        fs_1.default.unlinkSync(url);
}
exports.deleteFile = deleteFile;
function savePicture(prof_slika) {
    let prof_path = exports.default_slika;
    if (prof_slika !== "") {
        const prof_data = prof_slika.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
        const prof_image = Buffer.from(prof_data[2], 'base64');
        const prof_mime = prof_data[1] === "image/png" ? "png" : "jpg";
        prof_path = `../images/image_${Date.now()}.${prof_mime}`;
        fs_1.default.writeFileSync(prof_path, prof_image);
    }
    return prof_path;
}
exports.savePicture = savePicture;
// <img [src]="prof_slika" alt="Profilna slika">
function loadPicture(prof_path) {
    const prof_image = fs_1.default.readFileSync(prof_path);
    const prof_mime = prof_path.endsWith('.png') ? 'image/png' : 'image/jpeg';
    const prof_data = prof_image.toString('base64');
    const prof_slika = `data:${prof_mime};base64,${prof_data}`;
    return prof_slika;
}
exports.loadPicture = loadPicture;
function savePdf(cv_pdf) {
    const cv_data = cv_pdf.match(/^data:application\/pdf;base64,(.+)$/);
    const cv_content = Buffer.from(cv_data[1], 'base64');
    const cv_path = `../pdfs/pdf_${Date.now()}.pdf`;
    fs_1.default.writeFileSync(cv_path, cv_content);
    return cv_path;
}
exports.savePdf = savePdf;
// <a [href]="cv_pdf" download="biografija.pdf">Preuzmite radnu biografiju</a>
// <embed [src]="cv_pdf" type="application/pdf" width="600" height="400">
function loadPdf(cv_path) {
    const cv_data = fs_1.default.readFileSync(cv_path);
    const cv_content = cv_data.toString('base64');
    const cv_pdf = `data:application/pdf;base64,${cv_content}`;
    return cv_pdf;
}
exports.loadPdf = loadPdf;
function proveraBuducnost(datumVreme) {
    const sad = new Date();
    return datumVreme.getTime() > sad.getTime();
}
exports.proveraBuducnost = proveraBuducnost;
function proveraVikend(datumVreme) {
    const noviDatumVreme = new Date(datumVreme);
    noviDatumVreme.setTime(noviDatumVreme.getTime() - 3600000);
    const danUNedelji = noviDatumVreme.getDay();
    return danUNedelji === 0 || danUNedelji === 6;
}
exports.proveraVikend = proveraVikend;
function proveraVreme(datumVremeStart, datumVremeEnd) {
    const pocetnoVremeSati = datumVremeStart.getHours();
    const krajnjeVremeSati = datumVremeEnd.getHours();
    const krajnjeVremeMinuti = datumVremeEnd.getMinutes();
    if (pocetnoVremeSati < 11 || krajnjeVremeSati > 19)
        return true;
    else if (krajnjeVremeSati === 19 && krajnjeVremeMinuti > 0)
        return true;
    return false;
}
exports.proveraVreme = proveraVreme;
function nastavnikNedostupanNedelja(nastavnik, datumVreme) {
    return __awaiter(this, void 0, void 0, function* () {
        const nedeljaStart = new Date(datumVreme);
        nedeljaStart.setDate(nedeljaStart.getDate() - nedeljaStart.getDay() + (nedeljaStart.getDay() === 0 ? -6 : 1));
        nedeljaStart.setHours(11, 0, 0, 0);
        const nedeljaEnd = new Date(nedeljaStart);
        nedeljaEnd.setDate(nedeljaEnd.getDate() + 4);
        nedeljaEnd.setHours(19, 0, 0, 0);
        const nast = yield nastavnik_1.default.findOne({ kor_ime: nastavnik });
        return nast.nedostupnost.some(data => {
            const [start, end] = data.split('###').map(d => new Date(d));
            return start.getTime() === nedeljaStart.getTime() && end.getTime() === nedeljaEnd.getTime();
        });
    });
}
exports.nastavnikNedostupanNedelja = nastavnikNedostupanNedelja;
function nastavnikNedostupanDan(nastavnik, datumVreme) {
    return __awaiter(this, void 0, void 0, function* () {
        const danStart = new Date(datumVreme);
        danStart.setHours(11, 0, 0, 0);
        const danEnd = new Date(datumVreme);
        danEnd.setHours(19, 0, 0, 0);
        const nast = yield nastavnik_1.default.findOne({ kor_ime: nastavnik });
        return nast.nedostupnost.some(data => {
            const [start, end] = data.split('###').map(d => new Date(d));
            return start.getTime() === danStart.getTime() && end.getTime() === danEnd.getTime();
        });
    });
}
exports.nastavnikNedostupanDan = nastavnikNedostupanDan;
function postojiPreklapanje(nastavnik, datumVremeStart, datumVremeEnd, status) {
    return __awaiter(this, void 0, void 0, function* () {
        const preklapajuciCas = yield cas_1.default.findOne({
            nastavnik: nastavnik,
            status: status,
            datum_vreme_start: { $lt: datumVremeEnd.toISOString().slice(0, 16) + "Z" },
            datum_vreme_kraj: { $gt: datumVremeStart.toISOString().slice(0, 16) + "Z" }
        });
        return !!preklapajuciCas;
    });
}
exports.postojiPreklapanje = postojiPreklapanje;
