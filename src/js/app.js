import { $ } from './utils/index.js';
import { onSubmitFareForm, onChangeLottoViewerController } from './eventListener.js';

const runLottoGame = () => {
  $('#fare-form').addEventListener('submit', onSubmitFareForm);
  $('#lotto-viewer-controller').addEventListener('change', onChangeLottoViewerController);
};

export default runLottoGame;
