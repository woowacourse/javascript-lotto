import Lotto from "../../domain/Lotto.js";

export default class ConsoleApp {
  #purchaseLottoUseCase;
  #ui;

  constructor({ purchaseLottoUseCase, ui }) {
    this.#purchaseLottoUseCase = purchaseLottoUseCase;
    this.#ui = ui;
  }

  async run() {
    this.#retry(() => this.#lottoGame());
  }

  async #lottoGame() {
    do {
      await this.#retry(() => this.#processPurchase());
      await this.#retry(() => this.#processPurchase());
    } while (false);
  }

  async #processPurchase() {
    const amount = await this.#ui.readAmount();
    const { lottoNumbers, lottos } = this.#purchaseLottoUseCase.execute(amount);
    this.#ui.printLottos(lottoNumbers);
    return lottos;
  }

  async #processWinningNumber() {
    const inputNumbers = await this.#ui.readWinningLottoNumber();
    Lotto.validate(inputNumbers);

    const { lottoNumbers, lottos } = this.#purchaseLottoUseCase.execute(amount);
    this.#ui.printLottos(lottoNumbers);
    return lottos;
  }

  async #retry(fn) {
    while (true) {
      try {
        return await fn();
      } catch (error) {
        this.#ui.printError(error);
      }
    }
  }
}
