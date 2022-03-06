import LottoController from './lottoController.js';

import LottoCreator from './model/lottoCreator.js';
import LottoResultManager from './model/lottoResultManager.js';

import views from './views/index.js';

import '../css/index.css';

const startLotto = () => {
  const models = {
    lottoCreator: new LottoCreator(),
    LottoResultManager,
  };

  new LottoController(models, views);
};

document.addEventListener('DOMContentLoaded', startLotto);
