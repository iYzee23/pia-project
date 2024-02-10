import * as bcrypt from 'bcrypt';
import fs from 'fs';
import Nastavnik from "./models/nastavnik";
import Cas from "./models/cas";

const saltRounds = 10;
export const default_slika = "../images/default-profile-picture.jpg";

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(inputPassword: string, storedHash: string): Promise<boolean> {
    return bcrypt.compare(inputPassword, storedHash);
}

export function deleteFile(url: string) {
    if (fs.existsSync(url)) 
        fs.unlinkSync(url);
}

export function savePicture(prof_slika: string): string {
    let prof_path = default_slika;
    if (prof_slika !== "") {
        const prof_data = prof_slika.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
        const prof_image = Buffer.from(prof_data![2], 'base64');
        const prof_mime = prof_data![1] === "image/png" ? "png" : "jpg";
        prof_path = `../images/image_${Date.now()}.${prof_mime}`;
        fs.writeFileSync(prof_path, prof_image);
    }
    return prof_path;
}

// <img [src]="prof_slika" alt="Profilna slika">
export function loadPicture(prof_path: string): string {
    const prof_image = fs.readFileSync(prof_path);
    const prof_mime = prof_path.endsWith('.png') ? 'image/png' : 'image/jpeg';
    const prof_data = prof_image.toString('base64');
    const prof_slika = `data:${prof_mime};base64,${prof_data}`;
    return prof_slika;
}

export function savePdf(cv_pdf: string): string {
    const cv_data = cv_pdf.match(/^data:application\/pdf;base64,(.+)$/);
    const cv_content = Buffer.from(cv_data![1], 'base64');
    const cv_path = `../pdfs/pdf_${Date.now()}.pdf`;
    fs.writeFileSync(cv_path, cv_content);
    return cv_path;
}

// <a [href]="cv_pdf" download="biografija.pdf">Preuzmite radnu biografiju</a>
// <embed [src]="cv_pdf" type="application/pdf" width="600" height="400">
export function loadPdf(cv_path: string): string {
    const cv_data = fs.readFileSync(cv_path);
    const cv_content = cv_data.toString('base64');
    const cv_pdf = `data:application/pdf;base64,${cv_content}`;
    return cv_pdf;
}

export function proveraBuducnost(datumVreme: Date): boolean {
    const sad = new Date();
    return datumVreme.getTime() > sad.getTime();
}

export function proveraVikend(datumVreme: Date): boolean {
    const noviDatumVreme = new Date(datumVreme);
    noviDatumVreme.setTime(noviDatumVreme.getTime() - 3600000);
    const danUNedelji = noviDatumVreme.getDay();
    return danUNedelji === 0 || danUNedelji === 6;
}

export function proveraVreme(datumVremeStart: Date, datumVremeEnd: Date): boolean {
    const pocetnoVremeSati = datumVremeStart.getHours();
    const krajnjeVremeSati = datumVremeEnd.getHours();
    const krajnjeVremeMinuti = datumVremeEnd.getMinutes();

    if (pocetnoVremeSati < 11 || krajnjeVremeSati > 19) return true;
    else if (krajnjeVremeSati === 19 && krajnjeVremeMinuti > 0) return true;
    return false;
}

export async function nastavnikNedostupanNedelja(nastavnik: string, datumVreme: Date): Promise<boolean> {
    const nedeljaStart = new Date(datumVreme);
    nedeljaStart.setDate(nedeljaStart.getDate() - nedeljaStart.getDay() + (nedeljaStart.getDay() === 0 ? -6 : 1));
    nedeljaStart.setHours(11, 0, 0, 0);

    const nedeljaEnd = new Date(nedeljaStart);
    nedeljaEnd.setDate(nedeljaEnd.getDate() + 4);
    nedeljaEnd.setHours(19, 0, 0, 0);

    const nast = await Nastavnik.findOne({kor_ime: nastavnik});

    return nast!.nedostupnost.some(data => {
        const [start, end] = data.split('###').map(d => new Date(d));
        return start.getTime() === nedeljaStart.getTime() && end.getTime() === nedeljaEnd.getTime();
    });
}

export async function nastavnikNedostupanDan(nastavnik: string, datumVreme: Date): Promise<boolean> {
	const danStart = new Date(datumVreme);
    danStart.setHours(11, 0, 0, 0);

    const danEnd = new Date(datumVreme);
    danEnd.setHours(19, 0, 0, 0);

    const nast = await Nastavnik.findOne({kor_ime: nastavnik});

    return nast!.nedostupnost.some(data => {
        const [start, end] = data.split('###').map(d => new Date(d));
        return start.getTime() === danStart.getTime() && end.getTime() === danEnd.getTime();
    });
}

export async function nastavnikNedostupan(nastavnik: string, datumVremeStart: Date, datumVremeEnd: Date): Promise<boolean> {
    const nast = await Nastavnik.findOne({kor_ime: nastavnik});

    return nast!.nedostupnost.some(data => {
        const [start, end] = data.split('###').map(d => new Date(d));
        return start.getTime() < datumVremeEnd.getTime() && end.getTime() > datumVremeStart.getTime();
    });
}

export async function postojiPreklapanje(nastavnik: string, datumVremeStart: Date, datumVremeEnd: Date, status: string): Promise<boolean> {    
    const preklapajuciCas = await Cas.findOne({
        nastavnik: nastavnik,
        status: status,
        datum_vreme_start: { $lt: datumVremeEnd.toISOString().slice(0, 16) + "Z" },
        datum_vreme_kraj: { $gt: datumVremeStart.toISOString().slice(0, 16) + "Z" }
    });

    return !!preklapajuciCas;
}

export function popraviDatumStart(datumVremeStart: Date) {
    const noviDatumVreme = new Date(datumVremeStart);
    noviDatumVreme.setTime(noviDatumVreme.getTime() - 3600000);
    const danUNedelji = noviDatumVreme.getDay();

    if (danUNedelji === 0) {
        datumVremeStart.setDate(datumVremeStart.getDate() + 1);
        datumVremeStart.setHours(11, 0, 0, 0);
    }
    else if (danUNedelji === 6) {
        datumVremeStart.setDate(datumVremeStart.getDate() + 2);
        datumVremeStart.setHours(11, 0, 0, 0);
    }
    else if (noviDatumVreme.getHours() < 10) {
        datumVremeStart.setHours(11, 0, 0, 0);
    }
}

export function popraviDatumKraj(datumVremeKraj: Date) {
    const noviDatumVreme = new Date(datumVremeKraj);
    noviDatumVreme.setTime(noviDatumVreme.getTime() - 3600000);
    const danUNedelji = noviDatumVreme.getDay();

    if (danUNedelji === 0) {
        datumVremeKraj.setDate(datumVremeKraj.getDate() - 2);
        datumVremeKraj.setHours(19, 0, 0, 0);
    }
    else if (danUNedelji === 6) {
        datumVremeKraj.setDate(datumVremeKraj.getDate() - 1);
        datumVremeKraj.setHours(19, 0, 0, 0);
    }
    else if (noviDatumVreme.getHours() > 18 || (noviDatumVreme.getHours() === 18 && noviDatumVreme.getMinutes() > 0)) {
        datumVremeKraj.setHours(19, 0, 0, 0);
    }
}

export function proveriIstiDan(datumVremeStart: Date, datumVremeKraj: Date): boolean {
    const noviDatumVremeStart = new Date(datumVremeStart);
    const noviDatumVremeKraj = new Date(datumVremeKraj);

    noviDatumVremeStart.setTime(noviDatumVremeStart.getTime() - 3600000);
    noviDatumVremeKraj.setTime(noviDatumVremeKraj.getTime() - 3600000);

    return noviDatumVremeStart.getDay() === noviDatumVremeKraj.getDay();
}

export function popraviIstiDan(datumVremeStart: Date, datumVremeKraj: Date) {
    if (datumVremeStart.getHours() > 19 || (datumVremeStart.getHours() === 19 && datumVremeStart.getMinutes() > 0)) {
        datumVremeStart.setHours(19, 0, 0, 0);
    }

    if (datumVremeKraj.getHours() < 11) {
        datumVremeKraj.setHours(11, 0, 0, 0);
    }
}

export function popraviRazlDan(datumVremeStart: Date, datumVremeKraj: Date) {
    if (datumVremeStart.getHours() > 19 || (datumVremeStart.getHours() === 19 && datumVremeStart.getMinutes() > 0)) {
        datumVremeStart.setDate(datumVremeStart.getDate() + 1);
        datumVremeStart.setHours(11, 0, 0, 0);
    }

    if (datumVremeKraj.getHours() < 11) {
        datumVremeKraj.setDate(datumVremeKraj.getDate() - 1);
        datumVremeKraj.setHours(19, 0, 0, 0);
    }

    popraviDatumStart(datumVremeStart);
    popraviDatumKraj(datumVremeKraj);
}