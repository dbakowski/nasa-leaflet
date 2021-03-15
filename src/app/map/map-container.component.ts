import { Component, OnDestroy, OnInit } from '@angular/core';
import { NominatimService } from './services/nominatim.service';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { NominatimSearchResultModel } from './model/nominatim-search-result.model';
import { indicate } from '../shared/operators/indicate';
import { NasaEarthImageryService } from './services/nasa-earth-imagery.service';
import { ErrorHandlerService } from '../shared/services/error-handler.service';

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})
export class MapContainerComponent implements OnInit, OnDestroy {
  searchResults$ = new BehaviorSubject<NominatimSearchResultModel[]>([]);
  mapLayer$ = new BehaviorSubject<Blob | undefined>(undefined);
  loading$ = new BehaviorSubject<number>(0);
  lat = 29.78;
  lon = -95.33;
  private searchQuery$ = new Subject<string>();
  private destroy$ = new Subject<undefined>();

  constructor(
    private readonly nominatimService: NominatimService,
    private readonly nasaEarthImageryService: NasaEarthImageryService,
    private readonly errorHandler: ErrorHandlerService,
  ) {
  }

  ngOnInit(): void {
    this.observeQueryChange();
    this.loadEarthImage();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  setSelection(selection: NominatimSearchResultModel): void {
    this.lat = selection?.lat ?? this.lat;
    this.lon = selection?.lon ?? this.lon;
    this.loadEarthImage();
  }

  searchQueryChange(searchString: string): void {
    this.searchQuery$.next(searchString);
  }

  private loadEarthImage(): void {
    this.nasaEarthImageryService.getEarthImage(this.lat, this.lon).pipe(
      indicate(this.loading$),
      tap(this.errorHandler.createErrorObserver('Error occurred while getting earth image')),
      catchError(() => of(undefined)),
      tap((res: Blob | undefined) => this.mapLayer$.next(res)),
      take(1)
    ).subscribe();
  }

  private loadLocations(query: string): Observable<NominatimSearchResultModel[]> {
    return this.nominatimService.findLocations(query).pipe(
      indicate(this.loading$),
      catchError(() => of([])),
    );
  }

  private observeQueryChange(): void {
    this.searchQuery$.pipe(
      debounceTime(300),
      switchMap((query: string) => this.loadLocations(query)),
      tap(this.errorHandler.createErrorObserver('Error occurred while getting locations')),
      tap((results: NominatimSearchResultModel[]) => this.searchResults$.next(results)),
      takeUntil(this.destroy$),
    ).subscribe();
  }
}
