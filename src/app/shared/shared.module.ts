import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingBoxComponent } from './components/loading-box/loading-box.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    LoadingBoxComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    LoadingBoxComponent,
  ],
})
export class SharedModule {
}
