import { $, $$ } from './utils/index.js';
import {
  onSubmitFareForm,
  onChangeLottoViewerController,
  onKeyUpWinningNumbers,
} from './EventListener/index.js';

const runLottoGame = () => {
  $('#fare-form').addEventListener('submit', onSubmitFareForm);
  $('#lotto-viewer-controller').addEventListener('change', onChangeLottoViewerController);
  $$('.match-number-input').forEach(($numberInput) => {
    $numberInput.addEventListener('keyup', onKeyUpWinningNumbers);
  });
};

export default runLottoGame;
