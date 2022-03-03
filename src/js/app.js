import { $, $$ } from './utils/index.js';
import {
  onSubmitFareForm,
  onChangeLottoViewerController,
  onKeyUpWinningNumbers,
  onClickConfirmResultButton,
  onClickModalCloseButton,
  onClickRestartButton,
} from './EventListener/index.js';

const runLottoGame = () => {
  $('#fare-form').addEventListener('submit', onSubmitFareForm);
  $('#lotto-viewer-controller').addEventListener('change', onChangeLottoViewerController);
  $$('.match-number-input').forEach(($numberInput) => {
    $numberInput.addEventListener('keyup', onKeyUpWinningNumbers);
  });
  $('#confirm-result-button').addEventListener('click', onClickConfirmResultButton);
  $('#close-modal-button').addEventListener('click', onClickModalCloseButton);
  $('#restart-button').addEventListener('click', onClickRestartButton);
};

export default runLottoGame;
