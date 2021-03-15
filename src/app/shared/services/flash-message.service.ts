import { Injectable } from '@angular/core';
import { FlashMessageModel } from '../model/flash-message.model';
import { Observable, Subject } from 'rxjs';
import { FlashMessageTypeEnum } from '../enum/flash-message-type.enum';

@Injectable({
  providedIn: 'root'
})
export class FlashMessageService {
  private flashMessage$ = new Subject<FlashMessageModel>();

  sendMessage(type: FlashMessageTypeEnum, text: string, timeout = 3000): void {
    this.flashMessage$.next({ text, type, timeout })
  }

  sendError(text: string, timeout = 3000): void {
    this.sendMessage(FlashMessageTypeEnum.Error, text, timeout)
  }

  getFlashMessageObservable(): Observable<FlashMessageModel> {
    return this.flashMessage$;
  }
}
