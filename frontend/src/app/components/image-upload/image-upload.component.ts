import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  @Output() porukaEvent = new EventEmitter<string>();
  @Output() fileEvent = new EventEmitter<string>();
  @ViewChild('fileInput') fileInput!: ElementRef;

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (!file) {
      this.fileEvent.emit("");
      return;
    }

    if (file.type.match('image/jpeg') || file.type.match('image/png')) this.handleImage(file);
    else this.porukaEvent.emit("Nepodrzan tip fajla. Izaberite sliku u PNG/JPEG formatu.");
  }

  private handleImage(file: File) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const img = new Image();
      img.onload = () => {
        if (img.width < 100 || img.height < 100)
          this.porukaEvent.emit("Slika je premala. Minimalna velicina slike je 100x100px.");
        else if (img.width > 300 || img.height > 300)
          this.porukaEvent.emit("Slika je prevelika. Maksimalna velicina slike je 300x300px.");
        else {
          this.porukaEvent.emit("");
          this.fileEvent.emit(e.target.result);
        }
      };
      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  handlePonisti() {
    this.porukaEvent.emit("");
    this.fileEvent.emit("");
    if (this.fileInput && this.fileInput.nativeElement)
      this.fileInput.nativeElement.value = '';
  }
}
