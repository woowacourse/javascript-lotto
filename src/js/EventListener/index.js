import ValidationError from '../ValidationError/index.js';
import {
  createLottos,
  focusFareInput,
  toggleLottosView,
  writingwinningNumbers,
  renderMatchResultOnModal,
  focusOverlappedInput,
  closeModal,
  restartApp,
} from './domain.js';

export const onSubmitFareForm = (e) => {
  e.preventDefault();

  try {
    createLottos();
  } catch (error) {
    if (error instanceof ValidationError) {
      alert(error.message);
      focusFareInput();
      return;
    }

    throw error;
  }
};

export const onChangeLottoViewerController = toggleLottosView;

export const onKeyUpWinningNumbers = (e) => {
  try {
    writingwinningNumbers(e);
  } catch (error) {
    if (error instanceof ValidationError) {
      alert(error.message);
      focusOverlappedInput();
      return;
    }

    throw error;
  }
};

export const onSubmitWinningNumbersForm = (e) => {
  e.preventDefault();

  try {
    renderMatchResultOnModal();
  } catch (error) {
    if (error instanceof ValidationError) {
      alert(error.message);
      focusOverlappedInput();
      return;
    }

    throw error;
  }
};

export const onClickModalCloseButton = closeModal;

export const onClickRestartButton = restartApp;
