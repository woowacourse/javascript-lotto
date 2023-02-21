import LottoGameController from './LottoGameController.js';

export default class App {
  #lottoGameController;

  constructor() {
    this.#lottoGameController = new LottoGameController();
  }

  start() {
    this.#lottoGameController.play();
  }
}
