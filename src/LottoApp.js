import WebLottoController from './js/controller/WebLottoController.js';

class LottoApp {
  #appMode;

  constructor(appMode) {
    this.#appMode = appMode;
  }

  play() {
    if (this.#appMode === 'web') {
      const webLottoController = new WebLottoController();
      return;
    }
  }
}

export default LottoApp;
