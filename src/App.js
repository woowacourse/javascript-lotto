import Controller from "./controller/Controller";

class App {
  #controller;

  constructor() {
    this.#controller = new Controller();
  }

  async play() {
    await this.#controller.purchaseLottos();
    await this.#controller.issueWinningLotto();
    await this.#controller.calculateProfitRate();
    const isRetry = await this.#controller.retryGame();

    if (isRetry) return this.play();
  }
}

export default App;
