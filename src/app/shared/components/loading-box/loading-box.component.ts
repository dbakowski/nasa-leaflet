import { Component, Input } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-loading-box',
  templateUrl: './loading-box.component.html',
  styleUrls: ['./loading-box.component.scss']
})
export class LoadingBoxComponent {
  @Input() loading?: number | null;
  faSpinner = faSpinner;
}
