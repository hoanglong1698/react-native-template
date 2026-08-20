import { Easing } from 'react-native';
import {
  createModalStack,
  ModalOptions,
  ModalStackConfig,
} from 'react-native-modalfy';
import { AppAlertModal, AppLoadingModal } from '../../components/modals';
import { ModalName, ModalStackParamsList } from './modal.type';

const modalConfig: ModalStackConfig = {
  [ModalName.AppAlert]: {
    modal: AppAlertModal,
    position: 'center',
    transitionOptions: animatedValue => ({
      opacity: animatedValue.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [0, 1, 0],
      }),
      transform: [
        {
          scale: animatedValue.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [0.92, 1, 0.95],
          }),
        },
      ],
    }),
  },
  [ModalName.AppLoading]: {
    modal: AppLoadingModal,
    position: 'center',
    backBehavior: 'none',
    transitionOptions: animatedValue => ({
      opacity: animatedValue.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [0, 1, 0],
      }),
      transform: [
        {
          scale: animatedValue.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [0.9, 1, 0.95],
          }),
        },
      ],
    }),
  },
};

const defaultOptions: ModalOptions = {
  position: 'center',
  backdropOpacity: 0.5,
  backdropColor: 'black',
  backBehavior: 'pop',
  animateInConfig: {
    duration: 300,
    easing: Easing.out(Easing.ease),
  },
  animateOutConfig: {
    duration: 250,
    easing: Easing.in(Easing.ease),
  },
};

export const modalStack = createModalStack<ModalStackParamsList>(
  modalConfig,
  defaultOptions,
);
