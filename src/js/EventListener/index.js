import coveringTryCatch from './coveringTryCatch.js';
import { trySubmitFareForm, toggleLottosView, writingWinningNumber } from './domain.js';

export const onSubmitFareForm = (e) => {
  e.preventDefault();

  coveringTryCatch(trySubmitFareForm);
};

export const onChangeLottoViewerController = toggleLottosView;

export const onKeyUpLottoNumbers = writingWinningNumber;
