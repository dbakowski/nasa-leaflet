import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NominatimSearchResultModel } from '../../model/nominatim-search-result.model';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.scss']
})
export class LocationSearchComponent {
  @Input() results: NominatimSearchResultModel[] = [];
  @Output() searchQuery = new EventEmitter<string>();
  @Output() selection = new EventEmitter<NominatimSearchResultModel>();
}
