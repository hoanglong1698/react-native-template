import { ModalName } from '../navigation';
import { ModalHelper } from './modal-helper';

export class AppLoadingHelper {
  static show(message?: string, callback?: () => void): void {
    ModalHelper.show(ModalName.AppLoading, { message }, callback);
  }

  static hide(callback?: () => void): void {
    ModalHelper.hide(ModalName.AppLoading, callback);
  }
}
