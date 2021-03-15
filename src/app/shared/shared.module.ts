import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingBoxComponent } from './components/loading-box/loading-box.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlashMessageComponent } from './components/flash-message/flash-message.component';
import { FlashMessageService } from './services/flash-message.service';


@NgModule({
  declarations: [
    LoadingBoxComponent,
    FlashMessageComponent,
  ],
  providers: [
    FlashMessageService,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    LoadingBoxComponent,
    FlashMessageComponent,
  ],
})
export class SharedModule {
}
