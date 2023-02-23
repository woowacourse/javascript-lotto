import LottoGameController from './controller/LottoGameController';
import eventHandler from './view/eventHandler';
import './style.css';

const lottoGameController = new LottoGameController();

eventHandler.setPurchasePriceInputHandler(
  lottoGameController.handlePurchasePriceInput
);
eventHandler.setWinningNumbersInputHandler(
  lottoGameController.handleWinningNumbersInput
);
eventHandler.setCloseModalHandler(LottoGameController.handleCloseModal);
eventHandler.setRestartHandler(LottoGameController.handleRestart);
