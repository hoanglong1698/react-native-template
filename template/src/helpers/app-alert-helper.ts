import { AppAlertParams, ModalName } from '../navigation';
import { ModalHelper } from './modal-helper';

export class AppAlertHelper {
  static show(params: AppAlertParams, callback?: () => void): void {
    ModalHelper.show(ModalName.AppAlert, params, callback);
  }

  static hide(callback?: () => void): void {
    ModalHelper.hide(ModalName.AppAlert, callback);
  }
}
