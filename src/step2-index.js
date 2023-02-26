import LottoGameController from './controller/LottoGameController';
import eventHandler from './view/eventHandler';
import './style.css';
import view from './view/view';

const lottoGameController = new LottoGameController();

eventHandler.setPurchasePriceInputHandler(
  lottoGameController.handlePurchasePriceInput.bind(lottoGameController)
);
eventHandler.setWinningNumbersInputHandler(
  lottoGameController.handleWinningNumbersInput.bind(lottoGameController)
);
eventHandler.setCloseModalHandler(view.closeModal);
eventHandler.setRestartHandler(view.restart);
