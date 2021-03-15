import { NominatimSearchResultModel } from '../model/nominatim-search-result.model';

export class NominatimSearchResultSerializer {
  public static fromJson(res: any): NominatimSearchResultModel {
    return {
      lat: res?.lat && !Number.isNaN(res.lat) ? Number(res?.lat) : undefined,
      lon: res?.lon && !Number.isNaN(res.lon) ? Number(res?.lon) : undefined,
      displayName: res?.display_name,
    }
  }
}
