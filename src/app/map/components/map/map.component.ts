import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { icon, ImageOverlay, LatLngBounds } from 'leaflet';

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

  private setMarker(): void {
    if (!this.map) {
      return;
    }

    this.marker = L.marker([this.lat, this.lon], {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png'
      })
    }).addTo(this.map);
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

    this.setMarker();
  }

  private initMap(): void {
    const bounds = this.getBounds();
    this.map = L.map('map', {
      center: [this.lat, this.lon],
      zoom: 8,
      minZoom: 8,
      zoomControl: false,
      maxBounds: bounds
    });

    L.control.zoom({
      position: 'bottomleft'
    }).addTo(this.map);

    this.layer = L.imageOverlay('', bounds);
    this.layer.addTo(this.map);
  }
}
