import { $, $$ } from './utils/index.js';
import {
  onSubmitFareForm,
  onChangeLottoViewerController,
  onKeyUpLottoNumbers,
} from './EventListener/index.js';

const runLottoGame = () => {
  $('#fare-form').addEventListener('submit', onSubmitFareForm);
  $('#lotto-viewer-controller').addEventListener('change', onChangeLottoViewerController);
  $$('.match-number-input').forEach(($numberInput) => {
    $numberInput.addEventListener('keyup', onKeyUpLottoNumbers);
  });
};

export default runLottoGame;
