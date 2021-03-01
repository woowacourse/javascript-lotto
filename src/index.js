import LottoGame from './lotto/LottoGame.js';
import LottoController from './lotto/controller.js';
import View from './lotto/views/View.js';

const init = () => {
  const lottoController = new LottoController(new LottoGame(), new View());
  lottoController.bindLottoGameEvents();
};

init();
