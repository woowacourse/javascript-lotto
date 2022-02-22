import Lotto from './model/Lotto';
import LottoGame from './controller/LottoGame';

export default class App {
  constructor() {
    this.lottoGame = new LottoGame();
    this.init();
  }

  init() {
    console.log('init test');
  }
}
