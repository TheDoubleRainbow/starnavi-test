import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-game-box',
  templateUrl: './game-box.component.html',
  styleUrls: ['./game-box.component.scss']
})
export class GameBoxComponent implements OnInit {

  constructor() { }

  @Input() state: number;

  ngOnInit() {
  }

}
