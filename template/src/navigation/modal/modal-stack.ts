import { createModalStack, ModalOptions, ModalStackConfig } from 'react-native-modalfy';
import { AppAlertModal, AppLoadingModal } from '../../components/modals';
import { ModalName, ModalStackParamsList } from './modal.type';

const MODAL_ANIMATION_TIME = 300;

const modalConfig: ModalStackConfig = {
  [ModalName.AppAlert]: {
    modal: AppAlertModal,
    transitionOptions: animatedValue => ({
      opacity: animatedValue.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [0, 1, 0],
      }),
    }),
  },
  [ModalName.AppLoading]: {
    modal: AppLoadingModal,
    backBehavior: 'none',
    disableFlingGesture: true,
    transitionOptions: animatedValue => ({
      opacity: animatedValue.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [0, 1, 0],
      }),
    }),
  },
};

const defaultOptions: ModalOptions = {
  position: 'center',
  backdropOpacity: 0.6,
  backBehavior: 'pop',
  animateInConfig: { duration: MODAL_ANIMATION_TIME },
  animateOutConfig: { duration: MODAL_ANIMATION_TIME },
  backdropAnimationDuration: MODAL_ANIMATION_TIME,
};

export const modalStack = createModalStack<ModalStackParamsList>(modalConfig, defaultOptions);
