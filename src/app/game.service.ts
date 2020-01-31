import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() {}

  recursiveCalls = 0;

  lightBlock(grid: Array<any>, gridSize: number, delay: number, winCallback: Function) {
    let winCode = this.checkForWin(grid, gridSize);
    if(winCode != 0) {
      winCallback(winCode);
      return;
    }
    let box = this.getEmptyBox(grid, gridSize);
    if(!box) return false;
    grid[box.i][box.j].state = 1;
    grid = [...grid];

    setTimeout(() => this.tickBox(grid, gridSize, delay, winCallback, box.i, box.j), delay);
  }

  tickBox(grid:Array<any>, gridSize:number, delay:number, winCallback: Function, i: number, j: number) {
    if(grid[i][j].state === 1) {
      grid[i][j].state = 3;
      grid = [...grid];
      this.lightBlock(grid, gridSize, delay, winCallback);
    }
  }

  getEmptyBox(grid: Array<any>, gridSize:number) {
    const lineNum = this.rnd(0, gridSize - 1);
    let line = grid[lineNum];
    line = line.filter(box => box.state === 0);
    if(line.length === 0) {
      this.recursiveCalls += 1;
      if(this.recursiveCalls > 1000) {
        console.error('Too many calls')
        return false;
      }
      return this.getEmptyBox(grid, gridSize);
    }
    else {
      this.recursiveCalls = 0;
      return line[this.rnd(0, line.length - 1)];
    }
  }

  checkForWin(grid, gridSize) {
    let userCouner = 0;
    let computerCounter = 0;
    let gridHalf = Math.pow(gridSize, 2)/2;
    for(let i = 0; i < gridSize; i++) {
      let lineUser = grid[i].filter(box => box.state === 2);
      let lineComputer = grid[i].filter(box => box.state === 3);
      userCouner += lineUser.length;
      computerCounter += lineComputer.length;
    }

    console.log('Computer: ' + computerCounter);
    console.log('User: ' + userCouner);

    if(userCouner > gridHalf){
      return 1;
    }
    else if(computerCounter > gridHalf) {
      return 2;
    }
    else if(computerCounter === gridHalf && userCouner === gridHalf) {
      return 3;
    }
    else {
      return 0;
    }
  }


  rnd(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
}
