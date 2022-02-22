import Lotto from './model/Lotto.js';
import LottoGame from './controller/LottoGame.js';
import PurchaseMoneyController from './controller/PurchaseMoneyController.js';

export default class App {
  constructor() {
    this.lottoGame = new LottoGame();
    this.purchaseMoneyController = new PurchaseMoneyController();
    this.init();
  }

  init() {
    console.log('init test');
  }
}
