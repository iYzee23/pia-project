import * as bcrypt from 'bcrypt';
import fs from 'fs';

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