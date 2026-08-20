export enum ModalName {
  AppAlert = 'AppAlert',
  AppLoading = 'AppLoading',
}

export type AppAlertModalType = 'info' | 'success' | 'warning' | 'error';

export interface AppAlertParams {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  type?: AppAlertModalType;
  cancelable?: boolean;
}

export interface AppLoadingParams {
  message?: string;
}

export type ModalStackParamsList = {
  [ModalName.AppAlert]: AppAlertParams;
  [ModalName.AppLoading]: AppLoadingParams;
};
