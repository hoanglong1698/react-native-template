import { modalfy } from 'react-native-modalfy';
import { ModalStackParamsList } from '../navigation';

export class ModalHelper {
  private static get modalController() {
    return modalfy<ModalStackParamsList>();
  }

  static show<K extends keyof ModalStackParamsList>(
    name: K,
    params?: ModalStackParamsList[K],
    callback?: () => void,
  ): void {
    this.modalController.openModal(name, params, callback);
  }

  static hide<K extends keyof ModalStackParamsList>(
    name?: K,
    callback?: () => void,
  ): void {
    this.modalController.closeModal(name, callback);
  }

  static hideAll(callback?: () => void): void {
    this.modalController.closeAllModals(callback);
  }

  static getCurrentModal(): keyof ModalStackParamsList | null {
    return (this.modalController.currentModal as keyof ModalStackParamsList) ?? null;
  }
}
