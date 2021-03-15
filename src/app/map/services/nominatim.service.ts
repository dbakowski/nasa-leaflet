import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NominatimSearchResultSerializer } from '../serializer/nominatim-search-result.serializer';
import { Observable } from 'rxjs';
import { NominatimSearchResultModel } from '../model/nominatim-search-result.model';

@Injectable()
export class NominatimService {
  constructor(
    private readonly http: HttpClient,
  ) {

  }

  private static getBaseUrl(): string {
    return 'https://nominatim.openstreetmap.org/search';
  }

  public findLocations(searchString: string): Observable<NominatimSearchResultModel[]> {
    const params = { format: 'json', q: searchString };

    return this.http.get<NominatimSearchResultModel[]>(NominatimService.getBaseUrl(), { params }).pipe(
      map((res: any[]) => res.map((result) => NominatimSearchResultSerializer.fromJson(result))),
    );
  }
}
