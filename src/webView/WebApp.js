import LottoGame from '../domain/LottoGame.js';
import { $ } from './domUtils.js';
import { addPurchasingEvent } from './renderPurchasing';

class WebApp {
  constructor($app, lottoGame) {
    this.$app = $app;
    this.lottoGame = lottoGame;
  }

  play() {
    addPurchasingEvent(this.lottoGame);
  }
}
const webApp = new WebApp($('#app'), new LottoGame());
export default webApp;
