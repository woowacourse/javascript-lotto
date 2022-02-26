import { $ } from './utils/index.js';
import { onSubmitFareForm, onToggleLottoViewerController } from './eventListener.js';

const runLottoGame = () => {
  $('#fare-form').addEventListener('submit', onSubmitFareForm);
  $('#lotto-viewer-controller').addEventListener('change', onToggleLottoViewerController);
};

export default runLottoGame;
