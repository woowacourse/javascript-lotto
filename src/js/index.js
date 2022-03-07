import LottoController from './lottoController.js';

import LottoCreator from './model/lottoCreator.js';

import views from './views/index.js';

import '../css/index.css';

const startLotto = () => {
  const model = {
    lottoCreator: new LottoCreator(),
  };

  new LottoController(model, views);
};

document.addEventListener('DOMContentLoaded', startLotto);
