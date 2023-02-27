import LottoGame from '../domain/LottoGame.js';
import { $ } from './domUtils.js';
import { addPurchasingEvent } from './renderPurchasing';

class WebApp {
  constructor($app) {
    this.$app = $app;
  }

  play() {
    addPurchasingEvent(this.$app, new LottoGame());
  }
}
const webApp = new WebApp($('.app'));
export default webApp;
