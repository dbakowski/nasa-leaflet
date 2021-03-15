import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NominatimService } from './services/nominatim.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil, tap } from 'rxjs/operators';
import { NominatimSearchResultModel } from './model/nominatim-search-result.model';

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})
export class MapContainerComponent implements OnInit, OnDestroy {
  searchResults$ = new BehaviorSubject<NominatimSearchResultModel[]>([]);
  lat = 29.78;
  lon = -95.33;
  private searchQuery$ = new Subject<string>();
  private destroy$ = new Subject<undefined>();

  constructor(
    private readonly nominatimService: NominatimService,
  ) {
  }

  ngOnInit(): void {
    this.observeQueryChange();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  setSelection(selection: NominatimSearchResultModel): void {
    this.lat = selection?.lat ?? this.lat;
    this.lon = selection?.lon ?? this.lon;
  }

  searchQueryChange(searchString: string): void {
    this.searchQuery$.next(searchString);
  }

  private observeQueryChange(): void {
    this.searchQuery$.pipe(
      debounceTime(300),
      switchMap((query: string) => this.nominatimService.findLocations(query)),
      tap((results: NominatimSearchResultModel[]) => this.searchResults$.next(results)),
      takeUntil(this.destroy$),
    ).subscribe();
  }
}
