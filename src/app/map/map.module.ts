import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationSearchComponent } from './components/location-search/location-search.component';
import { MapContainerComponent } from './map-container.component';
import { MapComponent } from './components/map/map.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { NominatimService } from './services/nominatim.service';
import { NasaEarthImageryService } from './services/nasa-earth-imagery.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MapComponent,
    LocationSearchComponent,
    MapContainerComponent,
  ],
  exports: [
    MapContainerComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    NominatimService,
    NasaEarthImageryService,
  ],
})
export class MapModule {
}
