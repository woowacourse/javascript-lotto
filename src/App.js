import LottoGameController from './domain/LottoGameController';

export default class App {
  #lottoGameController;

  constructor() {
    this.#lottoGameController = new LottoGameController();
  }

  start() {
    this.#lottoGameController.play();
  }
}
