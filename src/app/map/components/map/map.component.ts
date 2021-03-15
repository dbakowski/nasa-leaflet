import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { ImageOverlay, LatLngBounds } from 'leaflet';
import { NasaEarthImageryService } from '../../services/nasa-earth-imagery.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {
  @Input() lat = 29.78;
  @Input() lon = -95.33;
  private map: L.Map | undefined;
  private marker: L.Marker | undefined;
  private layer: ImageOverlay | undefined;

  constructor(
    private readonly nasaEarthImageryService: NasaEarthImageryService,
  ) {
  }

  ngOnInit(): void {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.lon.currentValue || changes.lat.currentValue && !changes.lon.isFirstChange() && !changes.lat.isFirstChange()) {
      this.updateMapOnCoordChange();
    }
  }

  private getBounds(): LatLngBounds {
    return new LatLngBounds(
      L.latLng(this.lat - 15, this.lon - 15),
      L.latLng(this.lat + 15, this.lon + 15),
    );
  }

  private updateMapOnCoordChange(): void {
    if (!this.map || !this.layer) {
      return;
    }

    this.map.setMaxBounds(this.getBounds());
    this.layer.setUrl(this.nasaEarthImageryService.getEarthImage(this.lat, this.lon));
    this.layer.setBounds(this.getBounds());
    this.map.flyTo(L.latLng(this.lat, this.lon));

    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    this.marker = L.marker([this.lat, this.lon]).addTo(this.map);
  }

  private initMap(): void {
    const bounds = this.getBounds();
    this.map = L.map('map', {
      center: [this.lat, this.lon],
      zoom: 8,
      minZoom: 8,
      zoomControl: false, //TODO: Enable zoom
      maxBounds: bounds
    });

    const layerUrl = this.nasaEarthImageryService.getEarthImage(this.lat, this.lon);
    this.layer = L.imageOverlay(layerUrl, bounds);
    this.layer.addTo(this.map);

    this.layer.on('error', (error: any) => {
      console.log(error); //TODO: Add user feedback on error
    });
  }
}
