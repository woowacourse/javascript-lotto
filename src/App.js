import LottoGameController from './domain/LottoGameController.js';

export default class App {
  #lottoGameController;

  constructor() {
    this.#lottoGameController = new LottoGameController();
  }

  start() {
    this.#lottoGameController.listenViewEvents();
  }
}
