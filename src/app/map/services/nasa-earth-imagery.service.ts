import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class NasaEarthImageryService {
  constructor(
    private readonly http: HttpClient,
  ) {
  }

  public getEarthImage(lat: number, lon: number, sizeInDeg = 0.3): Observable<Blob> {
    return this.http.get(NasaEarthImageryService.getUrl(lat, lon, sizeInDeg), { responseType: 'blob' });
  }

  private static getUrl(lat: number, lon: number, sizeInDeg = 0.3): string {
    return 'https://api.nasa.gov/planetary/earth/imagery?date=2018-01-01&lon='
      + lon
      + '&lat='
      + lat
      + '&dim='
      + sizeInDeg
      + '&api_key=DEMO_KEY';
  }
}
