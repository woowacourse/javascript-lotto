import './css/style.css';
import LottoGameController from './js/controller/LottoGameController';

export default class App {
  constructor() {
    this.lottoGameController = new LottoGameController();
  }
}

new App();
