import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NasaEarthImageryService {
  public getEarthImage(lat: number, lon: number, sizeInDeg = 0.3): string {
    return 'https://api.nasa.gov/planetary/earth/imagery?date=2018-01-01&lon='
      + lon
      + '&lat='
      + lat
      + '&dim='
      + sizeInDeg
      + '&api_key=DEMO_KEY';
  }
}
