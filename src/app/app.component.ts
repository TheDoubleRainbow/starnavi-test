import { Component } from '@angular/core';
import { GameService } from './game.service';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private gameService: GameService, private apiService: ApiService) {}

  gameState = 0; // 0 - waiting for start; 1 - started; 2 - finished;
  gameMode = 'none';
  gridSize = 0;
  delay = 0;
  grid = [];
  username = '';
  message = '';
  leaders = null;

  startGame(data: any) {
    this.gameMode = data.gameMode;
    this.gridSize = data.gameModes[this.gameMode].field;
    this.delay = data.gameModes[this.gameMode].delay;
    this.username = data.name;

    this.generateGrid();
  }

  generateGrid() {
    this.grid.length = 0;
    for(var i = 0; i < this.gridSize; i++) {
      this.grid[i] = [];
      for(var j = 0; j < this.gridSize; j++) {
        this.grid[i][j] = {
          state: 0, // 0 - initial, 1 - blue, 2 - green, 3 - red;
          i, j,
        }
      }
    }

    this.message = 'Ready!';
    setTimeout(()=>this.message = 'Steady!', 1000);
    setTimeout(()=> {
      this.message = 'GO!';
      this.gameState = 1;
      this.gameService.lightBlock(this.grid, this.gridSize, this.delay, this.onWin.bind(this));
    }, 2000);
    setTimeout(()=>this.message = '', 3000);
  }

  boxClicked(box) {
    if(box.state === 1) {
      this.grid[box.i][box.j].state = 2;
      this.grid = [...this.grid];

      this.gameService.lightBlock(this.grid, this.gridSize, this.delay, this.onWin.bind(this));
    }
  }

  onWin(type: number) { // 1 - user, 2 - computer, 3 - draw
    this.gameState = 2;
    this.message = type === 1 ? `${this.username} won!` : type === 2 ? 'Computer won' : 'Wow, mate somehow you draw, probably you\'ve played on normal difficulty';
    console.log('Win registred with status ' + type);
    this.apiService.sendWinner(type === 1 ? this.username : type === 2 ? 'Computer' : 'Draw').then(() => {
      this.getLeaders();
    });
  }

  getLeaders() {
    this.apiService.getWinners().toPromise().then(data => {
      this.leaders = data;
    }).catch(e => {
      console.warn('Error while loading leaders', e)
    })
  }

  ngOnInit() {
    this.getLeaders();
  }
}
