import Lotto from './model/Lotto.js';
import LottoGame from './controller/LottoGame.js';

export default class App {
  constructor() {
    this.lottoGame = new LottoGame();
    this.init();
  }

  init() {
    console.log('init test');
  }
}
