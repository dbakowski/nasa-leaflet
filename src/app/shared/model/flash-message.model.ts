import { FlashMessageTypeEnum } from '../enum/flash-message-type.enum';

export interface FlashMessageModel {
  text: string;
  timeout: number;
  type: FlashMessageTypeEnum;
}
