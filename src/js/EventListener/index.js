import coveringTryCatch from './coveringTryCatch.js';
import {
  trySubmitFareForm,
  catchSubmitFareForm,
  toggleLottosView,
  writingwinningNumbers,
  tryClickConfirmResultButton,
  catchClickConfirmResultButton,
  closeModal,
  restartApp,
} from './domain.js';

export const onSubmitFareForm = (e) => {
  e.preventDefault();

  coveringTryCatch(trySubmitFareForm, catchSubmitFareForm);
};

export const onChangeLottoViewerController = toggleLottosView;

export const onKeyUpWinningNumbers = (e) => {
  coveringTryCatch(() => writingwinningNumbers(e), catchClickConfirmResultButton);
};

export const onSubmitWinningNumbersForm = (e) => {
  e.preventDefault();

  coveringTryCatch(tryClickConfirmResultButton, catchClickConfirmResultButton);
};

export const onClickModalCloseButton = closeModal;

export const onClickRestartButton = restartApp;
