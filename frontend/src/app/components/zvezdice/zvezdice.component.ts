import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-zvezdice',
  templateUrl: './zvezdice.component.html',
  styleUrls: ['./zvezdice.component.css']
})
export class ZvezdiceComponent {
  @Output() ratingSelected = new EventEmitter<number>();
  ocena_ucenik: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];

  selectRating(rating: number) {
    this.ocena_ucenik = rating;
    this.ratingSelected.emit(this.ocena_ucenik); // Emit the selected rating
  }
}
