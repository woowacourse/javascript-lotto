import { $, $$ } from './utils/index.js';
import {
  onSubmitFareForm,
  onChangeLottoViewerController,
  onKeyUpWinningNumbers,
  onClickConfirmResultButton,
} from './EventListener/index.js';

const runLottoGame = () => {
  $('#fare-form').addEventListener('submit', onSubmitFareForm);
  $('#lotto-viewer-controller').addEventListener('change', onChangeLottoViewerController);
  $$('.match-number-input').forEach(($numberInput) => {
    $numberInput.addEventListener('keyup', onKeyUpWinningNumbers);
  });
  $('#confirm-result-button').addEventListener('click', onClickConfirmResultButton);
};

export default runLottoGame;
