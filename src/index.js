import LottoGame from './lotto/LottoGame.js';
import LottoController from './lotto/controller.js';
import view from './lotto/view.js';

const init = () => {
  const lottoController = new LottoController(new LottoGame(), view);
  lottoController.bindLottoGameEvents();
};

init();
