import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { ImageOverlay, LatLngBounds } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {
  @Input() lat = 29.78;
  @Input() lon = -95.33;
  @Input() mapLayer: Blob | null | undefined;
  private map: L.Map | undefined;
  private marker: L.Marker | undefined;
  private layer: ImageOverlay | undefined;

  ngOnInit(): void {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.lon && !changes.lon.isFirstChange())
      || (changes.lat && !changes.lat.isFirstChange())) {
      this.updateMapOnCoordChange();
    }

    if (changes.mapLayer && changes.mapLayer.currentValue) {
      this.layer?.setUrl(URL.createObjectURL(changes.mapLayer.currentValue));
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

    const bounds = this.getBounds();
    this.map.setMaxBounds(bounds);
    this.layer.setBounds(bounds);
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

    this.layer = L.imageOverlay('', bounds);
    this.layer.addTo(this.map);
  }
}
