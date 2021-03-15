import { Component, OnDestroy, OnInit } from '@angular/core';
import { FlashMessageModel } from '../../model/flash-message.model';
import { FlashMessageService } from '../../services/flash-message.service';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-flash-message',
  templateUrl: './flash-message.component.html',
  styleUrls: ['./flash-message.component.scss']
})
export class FlashMessageComponent implements OnInit, OnDestroy {
  flashMessages: FlashMessageModel[] = [];
  faTimes = faTimes;
  private destroy$ = new Subject<undefined>();

  constructor(
    private readonly flashMessageService: FlashMessageService,
  ) {
  }

  ngOnInit(): void {
    this.flashMessageService.getFlashMessageObservable().pipe(
      tap((message: FlashMessageModel) => {
        this.flashMessages.push(message);
        setTimeout(() => this.closeMessage(message), message.timeout);
      }),
      takeUntil(this.destroy$),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  closeMessage(flashMessage: FlashMessageModel): void {
    const i = this.flashMessages.indexOf(flashMessage);

    if (i !== -1) {
      this.flashMessages.splice(i, 1);
    }
  }
}
