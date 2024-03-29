import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-pdf-upload',
  templateUrl: './pdf-upload.component.html',
  styleUrls: ['./pdf-upload.component.css']
})
export class PdfUploadComponent {
  @Output() porukaEvent = new EventEmitter<string>();
  @Output() fileEvent = new EventEmitter<string>();
  @ViewChild('tFileInput') tFileInput!: ElementRef;

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (!file) {
      this.porukaEvent.emit("Niste izabrali fajl.");
      return;
    }

    if (file.type.match('application/pdf')) this.handlePdf(file);
    else this.porukaEvent.emit("Nepodrzan tip fajla. Izaberite PDF.");
  }

  private handlePdf(file: File) {
    if (file.size > 3000000) {
      this.porukaEvent.emit("PDF je preveliki. Maksimalna velicina je 3MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.porukaEvent.emit("");
      this.fileEvent.emit(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  handlePonisti() {
    this.porukaEvent.emit("");
    this.fileEvent.emit("");
    if (this.tFileInput && this.tFileInput.nativeElement)
      this.tFileInput.nativeElement.value = '';
  }
}
