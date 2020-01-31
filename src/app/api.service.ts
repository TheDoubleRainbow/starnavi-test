import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as moment  from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  public getGameSettings() {
    return this.http.get(`${environment.endpoint}/game-settings`);
  }

  public getWinners() {
    return this.http.get(`${environment.endpoint}/winners`);
  }

  public sendWinner(winner: string) {
    const jsonStatham = JSON.stringify({
      winner,
      date: moment().format('HH:mm; DD MMMM YYYY')
    })
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(`${environment.endpoint}/winners`, jsonStatham, {headers: headers}).toPromise();
  }
}
