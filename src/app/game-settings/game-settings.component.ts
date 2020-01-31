import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.scss']
})
export class GameSettingsComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  
  @Input() gameState: number;

  @Output() started: EventEmitter<any> = new EventEmitter();

  gameSettingsForm = new FormGroup(
    {
      gameMode: new FormControl(''),
      name: new FormControl('', [Validators.required])
    }
  );

  gameModes = {};

  start() {
    this.started.emit({
      ...this.gameSettingsForm.value,
      gameModes: this.gameModes
    });
  }

  formSubmit() {
    if(!this.gameSettingsForm.valid) return false;
    this.start();
  }

  ngOnInit() {
    this.apiService.getGameSettings().toPromise().then(data => {
      this.gameModes = data;
      this.gameSettingsForm.setValue(
        {
          gameMode: 'easyMode',
          name: this.gameSettingsForm.value.name
        }
      )
    }).catch(e => {
      console.warn('Error while loading game settings: ', e);
    })
  }

}
