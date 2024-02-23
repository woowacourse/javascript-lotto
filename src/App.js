import Controller from "./controller/Controller";

class App {
  #controller;

  constructor() {
    this.#controller = new Controller();
  }

  async play() {
    const lottos = await this.#controller.purchaseLottos();
    await this.#controller.generateWinningLotto();
    await this.#controller.calculateProfitRate(lottos);
    const isRetry = await this.#controller.retryGame();

    if (isRetry) return this.play();
  }
}

export default App;
