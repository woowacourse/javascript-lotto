import coveringTryCatch from './coveringTryCatch.js';
import {
  trySubmitFareForm,
  toggleLottosView,
  writingWinningNumber,
  tryClickConfirmResultButton,
  closeModal,
  restartApp,
} from './domain.js';

export const onSubmitFareForm = (e) => {
  e.preventDefault();

  coveringTryCatch(trySubmitFareForm);
};

export const onChangeLottoViewerController = toggleLottosView;

export const onKeyUpWinningNumbers = writingWinningNumber;

export const onClickConfirmResultButton = () => {
  coveringTryCatch(tryClickConfirmResultButton);
};

export const onClickModalCloseButton = closeModal;

export const onClickRestartButton = restartApp;
