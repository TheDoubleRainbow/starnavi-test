import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.scss']
})
export class GameFieldComponent implements OnInit {

  constructor() { }

  @Input() grid: Array<Array<any>>;
  @Input() gameState: number;

  @Output() clicked: EventEmitter<any> = new EventEmitter();

  boxClicked(box) {
    this.clicked.emit(box);
  }

  ngOnInit() {
  }

}
