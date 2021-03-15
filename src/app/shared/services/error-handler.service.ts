import { Injectable } from '@angular/core';
import { FlashMessageService } from './flash-message.service';
import { ErrorObserver } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(
    private flashMessageService: FlashMessageService,
  ) {
  }

  createErrorObserver(message: string): ErrorObserver<any> {
    return {
      error: (err: any) => {
        this.flashMessageService.sendDanger(message);
      }
    };
  }
}
